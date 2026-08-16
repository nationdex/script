"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$md5",
    version: "1.2.0",
    description: "Creates a md5 key from given input",
    unwrap: true,
    brackets: true,
    output: structures_1.ArgType.String,
    args: [
        {
            name: "input",
            description: "Input to use for feeding",
            rest: false,
            required: true,
            type: structures_1.ArgType.String,
        },
        {
            name: "encoding",
            type: structures_1.ArgType.String,
            description: "The output encoding",
            rest: false,
            required: false,
        },
    ],
    execute(_ctx, [input, enc]) {
        const md5 = (0, node_crypto_1.createHash)("md5")
            .update(input)
            .digest()
            .toString((enc || "hex"));
        return this.success(md5);
    },
});
//# sourceMappingURL=md5.js.map