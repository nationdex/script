"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = require("node:path");
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$pathResolve",
    version: "2.2.0",
    description: "Resolves paths into an absolute path",
    unwrap: true,
    brackets: true,
    output: structures_1.ArgType.String,
    args: [
        {
            name: "paths",
            description: "The paths to resolve",
            rest: true,
            required: true,
            type: structures_1.ArgType.String,
        },
    ],
    execute(_ctx, [paths]) {
        return this.success((0, node_path_1.resolve)(...paths));
    },
});
//# sourceMappingURL=pathResolve.js.map