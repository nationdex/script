/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { resolve } from "node:path"
import { Collection } from "discord.js"
import { TypedEmitter } from "tiny-typed-emitter"
import { FileReader, type ForgeClient } from "../core"
import recursiveReaddirSync from "../functions/recursiveReaddirSync"
import { BaseCommand, type IBaseCommand, Logger } from "../structures"

export interface ICommandManagerEvents<_T> {
    update: () => void
}

export abstract class BaseCommandManager<T> extends TypedEmitter<ICommandManagerEvents<T>> {
    private readonly commands = new Collection<T, BaseCommand<T>[]>()
    private readonly paths = [] as string[]

    public abstract handlerName: string

    public constructor(private readonly client: ForgeClient) {
        super()
    }

    public refresh() {
        for (const [key, commands] of this.commands) {
            // Unload the ones added thru folders
            const unloadable = commands.filter((x) => !x.data.unloadable)
            // Keep unloadable
            this.commands.set(key, unloadable)
        }

        for (const p of this.paths) {
            for (const file of recursiveReaddirSync(p).filter(
                (x) =>
                    ((x.endsWith(".js") || x.endsWith(".ts") || x.endsWith(".cjs") || x.endsWith(".mjs")) &&
                        !x.endsWith(".d.ts")) ||
                    x.endsWith(".fs")
            )) {
                const filePath = resolve(file)
                delete require.cache[require.resolve(filePath)]
            }

            // Reload these commands
            this.load(p)
        }
    }

    public load(path: string) {
        if (!this.paths.includes(path)) this.paths.push(path)

        for (const file of recursiveReaddirSync(path).filter(
            (x) =>
                ((x.endsWith(".js") || x.endsWith(".ts") || x.endsWith(".cjs") || x.endsWith(".mjs")) &&
                    !x.endsWith(".d.ts")) ||
                x.endsWith(".fs")
        )) {
            const filePath = resolve(file)

            const req = FileReader.read(file, filePath)
            if (!req) continue

            if (Array.isArray(req)) this.addPath(true, filePath, ...req)
            else this.addPath(true, filePath, req)
        }
    }

    public get count() {
        return this.commands.reduce((x, y) => x + y.length, 0)
    }

    public get(type: T, fn?: (cmd: BaseCommand<T>) => boolean): BaseCommand<T>[] {
        const cmds = this.commands.get(type) ?? []
        if (!fn) return cmds
        return cmds.filter(fn)
    }

    public add(...commands: (IBaseCommand<T> | BaseCommand<T>)[]) {
        this.addPath(false, undefined, ...commands)
    }

    private addPath(unloadable: boolean, path?: string, ...commands: (IBaseCommand<T> | BaseCommand<T>)[]) {
        for (let i = 0, len = commands.length; i < len; i++) {
            const req = commands[i]
            const cmd = req instanceof BaseCommand ? req : new BaseCommand({ ...req, path })
            if (path) cmd.setPath(path)

            cmd.validate()

            if (this.handlerName && !this.client.events.has(this.handlerName, cmd.type)) {
                Logger.warn(
                    `Command is using the following listener: ${cmd.type} but the client is not listening to it. (${cmd.data.path ?? "index file"})`
                )
            }

            const col = this.commands.ensure(cmd.type as T, () => [])
            cmd.data.unloadable = unloadable

            col.push(cmd)
        }

        this.emit("update")
    }

    public toArray() {
        return Array.from(this.commands.values()).flat()
    }
}
