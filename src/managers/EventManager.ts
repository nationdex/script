/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { resolve } from "node:path"
import { Collection } from "discord.js"
import type { ForgeClient } from "../core/ForgeClient"
import recursiveReaddirSync from "../functions/recursiveReaddirSync"
import type { BaseEventHandler } from "../structures"

export const NativeEventName = "native"

export class EventManager {
    public static readonly Loaded: Partial<Record<string, Record<string, BaseEventHandler>>> = {}

    private events = new Collection<string, Collection<string, BaseEventHandler>>()

    public constructor(private readonly client: ForgeClient) {}

    public static loadNative() {
        EventManager.load(NativeEventName, `${__dirname}/../handlers/events`)
    }

    load(name: string, ...events: (string | string[])[]): void {
        for (const eventType of events.flat()) {
            EventManager.Loaded[name] ??= {}
            const event = EventManager.Loaded[name]![eventType]
            if (!event) throw new Error(`Event ${name} => ${eventType} is not supported.`)
            if (this.events.get(name)?.has(eventType)) continue
            EventManager.Loaded[name]![eventType] = event
            this.events.ensure(name, () => new Collection()).set(eventType, event)
            event.register(this.client)
        }
    }

    public static load(name: string, path: string) {
        EventManager.Loaded[name] = {}
        for (const file of recursiveReaddirSync(path).filter(
            (x) =>
                (x.endsWith(".js") || x.endsWith(".ts") || x.endsWith(".cjs") || x.endsWith(".mjs")) &&
                !x.endsWith(".d.ts")
        )) {
            const req = require(resolve(file)).default as BaseEventHandler
            EventManager.Loaded[name]![req.name] = req
        }
    }

    public static toJSON(name: string) {
        return Object.values(EventManager.Loaded[name]!).map((x) => ({ ...x!.data }))
    }

    public has(handler: string, type: any) {
        return this.events.get(handler)?.has(type) ?? false
    }
}
