"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = require("node:path");
const discord_js_1 = require("discord.js");
const generateMetadata_1 = __importDefault(require("./functions/generateMetadata"));
const managers_1 = require("./managers");
const expose = {
    GatewayIntentBits: discord_js_1.GatewayIntentBits,
    StickerFormatType: discord_js_1.StickerFormatType,
    ComponentType: discord_js_1.ComponentType,
};
(0, generateMetadata_1.default)((0, node_path_1.join)(__dirname, "native"), "native", managers_1.NativeEventName, false, expose, (0, node_path_1.join)(__dirname, "handlers", "events"));
//# sourceMappingURL=docgen.js.map