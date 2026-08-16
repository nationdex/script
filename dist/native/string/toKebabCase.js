"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$toKebabCase",
    version: "1.0.6",
    description: "Converts a string to kebab case",
    brackets: true,
    unwrap: true,
    output: structures_1.ArgType.String,
    args: [
        {
            name: "message",
            description: "The string to turn kebab case",
            rest: false,
            required: true,
            type: structures_1.ArgType.String,
        },
    ],
    execute(_ctx, [m]) {
        return this.success((0, lodash_1.kebabCase)(m));
    },
});
//# sourceMappingURL=toKebabCase.js.map