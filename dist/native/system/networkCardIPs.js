"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_os_1 = require("node:os");
const array_1 = __importDefault(require("../../functions/array"));
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$networkCardIPs",
    version: "1.2.0",
    description: "Returns your network's card ips",
    unwrap: true,
    output: (0, array_1.default)(),
    brackets: false,
    args: [
        {
            name: "separator",
            description: "The separator to use",
            rest: false,
            required: true,
            type: structures_1.ArgType.String,
        },
    ],
    execute(_ctx, [sep]) {
        return this.success(Object.values((0, node_os_1.networkInterfaces)())
            .map((x) => x
            ?.map((x) => x.address)
            .filter(Boolean)
            .join(sep ?? ", "))
            .join(sep ?? ", "));
    },
});
//# sourceMappingURL=networkCardIPs.js.map