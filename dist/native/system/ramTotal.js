"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_os_1 = __importDefault(require("node:os"));
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$ramTotal",
    version: "2.2.0",
    description: "Returns the maximum total ram capacity of the system in GB",
    aliases: ["$memoryTotal", "$maxRam"],
    unwrap: false,
    output: structures_1.ArgType.Number,
    execute(_ctx) {
        return this.success(node_os_1.default.totalmem() / 1024 ** 3);
    },
});
//# sourceMappingURL=ramTotal.js.map