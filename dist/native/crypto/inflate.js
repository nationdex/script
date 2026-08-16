"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_zlib_1 = require("node:zlib");
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$inflate",
    version: "1.2.0",
    description: "Decompresses given input",
    unwrap: true,
    brackets: true,
    output: structures_1.ArgType.String,
    args: [
        {
            name: "input",
            description: "The text to decompress",
            type: structures_1.ArgType.String,
            rest: false,
            required: true,
        },
        {
            name: "encoding",
            rest: false,
            required: false,
            description: "The input encoding to use",
            type: structures_1.ArgType.String,
        },
    ],
    execute(_ctx, [input, enc]) {
        return this.success((0, node_zlib_1.inflateSync)(new Uint8Array(Buffer.from(input, (enc ?? "hex")))).toString("utf-8"));
    },
});
//# sourceMappingURL=inflate.js.map