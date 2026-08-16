/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { join, resolve } from "node:path"
import { deserialize, serialize } from "node:v8"
import { Compiler, type IRawFunction } from "../core"
import { enumToArray } from "../functions/enum"
import recursiveReaddirSync from "../functions/recursiveReaddirSync"
import { Logger } from "../structures/@internal/Logger"
import { ArgType, type IArg, type INativeFunction, type NativeFunction } from "../structures/@internal/NativeFunction"

export type RecursiveArray<T> = T | T[]

export class FunctionManager {
    private static readonly Functions = new Map<string, NativeFunction>()

    public static loadNative() {
        FunctionManager.load("ForgeScript", join(__dirname, "..", "native"))
    }

    public static load(provider: string, path: string): void
    public static load(path: string): void
    public static load(provider: string, path?: string) {
        // Backwards compatibility smh
        if (!path) return FunctionManager.load("Unknown", provider)

        const overrideAttempts: string[] = []

        const loader: NativeFunction[] = []

        for (const file of recursiveReaddirSync(path).filter(
            (x) =>
                (x.endsWith(".js") || x.endsWith(".ts") || x.endsWith(".cjs") || x.endsWith(".mjs")) &&
                !x.endsWith(".d.ts")
        )) {
            const resolvedPath = resolve(file)
            const req = require(resolvedPath).default as NativeFunction
            req.path = file

            if (FunctionManager.Functions.has(req.name)) {
                overrideAttempts.push(req.name)
                continue
            }

            if (!req.data.args?.length) req.data.unwrap = false

            loader.push(req)
        }

        FunctionManager.addMany(loader)

        if (overrideAttempts.length !== 0)
            Logger.warn(
                `${provider} | Attempted to override the following ${overrideAttempts.length} functions: ${overrideAttempts.join(", ")}`
            )
    }

    public static addMany(...fns: RecursiveArray<NativeFunction>[]): void {
        for (let i = 0, len = fns.length; i < len; i++) {
            const fn = fns[i]
            if (Array.isArray(fn)) FunctionManager.addMany(...fn)
            else FunctionManager.Functions.set(fn.name, fn)
        }
        FunctionManager.reload()
    }

    public static add(fn: NativeFunction<IArg[]>) {
        return FunctionManager.addMany(fn)
    }

    public static reload() {
        Compiler["setFunctions"](FunctionManager.raw)
    }

    public static get(name: string) {
        return FunctionManager.Functions.get(name)!
    }

    public static toJSON(): INativeFunction<any>[] {
        return Array.from(FunctionManager.Functions.values()).map((x) => {
            const d = { ...x.data }
            d.args?.forEach((x) => {
                Reflect.deleteProperty(x, "check")
            })
            Reflect.deleteProperty(d, "execute")
            const data = deserialize(new Uint8Array(serialize(d))) as INativeFunction<any>

            data.args?.forEach((x) => {
                x.type = ArgType[x.type]
                if (x.enum) x.enum = enumToArray(x.enum)
            })

            return data
        })
    }

    public static get raw(): IRawFunction[] {
        return Array.from(FunctionManager.Functions).map((x) => {
            const [name, { data }] = x
            return {
                aliases: data.aliases ?? null,
                name,
                args:
                    data.brackets === undefined
                        ? null
                        : {
                              required: data.brackets,
                              fields: data.args!.map((x) => ({
                                  condition: x.condition,
                                  rest: x.rest,
                              })),
                          },
            }
        })
    }
}
