"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = exports.NativeEventName = void 0;
const node_path_1 = require("node:path");
const discord_js_1 = require("discord.js");
const recursiveReaddirSync_1 = __importDefault(require("../functions/recursiveReaddirSync"));
exports.NativeEventName = "native";
class EventManager {
    client;
    static Loaded = {};
    events = new discord_js_1.Collection();
    constructor(client) {
        this.client = client;
    }
    static loadNative() {
        EventManager.load(exports.NativeEventName, `${__dirname}/../handlers/events`);
    }
    load(name, ...events) {
        for (const eventType of events.flat()) {
            EventManager.Loaded[name] ??= {};
            const event = EventManager.Loaded[name][eventType];
            if (!event)
                throw new Error(`Event ${name} => ${eventType} is not supported.`);
            if (this.events.get(name)?.has(eventType))
                continue;
            EventManager.Loaded[name][eventType] = event;
            this.events.ensure(name, () => new discord_js_1.Collection()).set(eventType, event);
            event.register(this.client);
        }
    }
    static load(name, path) {
        EventManager.Loaded[name] = {};
        for (const file of (0, recursiveReaddirSync_1.default)(path).filter((x) => (x.endsWith(".js") || x.endsWith(".ts") || x.endsWith(".cjs") || x.endsWith(".mjs")) &&
            !x.endsWith(".d.ts"))) {
            const req = require((0, node_path_1.resolve)(file)).default;
            EventManager.Loaded[name][req.name] = req;
        }
    }
    static toJSON(name) {
        return Object.values(EventManager.Loaded[name]).map((x) => ({ ...x.data }));
    }
    has(handler, type) {
        return this.events.get(handler)?.has(type) ?? false;
    }
}
exports.EventManager = EventManager;
//# sourceMappingURL=EventManager.js.map