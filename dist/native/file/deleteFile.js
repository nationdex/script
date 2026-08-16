"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$deleteFile",
    version: "1.0.0",
    description: "Deletes a file",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "path",
            description: "The path to the file",
            rest: false,
            required: true,
            type: structures_1.ArgType.String,
        },
    ],
    execute(_ctx, [path]) {
        (0, node_fs_1.rmSync)(path, { recursive: true });
        return this.success();
    },
});
//# sourceMappingURL=deleteFile.js.map