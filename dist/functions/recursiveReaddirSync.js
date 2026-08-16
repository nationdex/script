"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = recursiveReaddirSync;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
function recursiveReaddirSync(path) {
    const arr = [];
    for (const file of (0, node_fs_1.readdirSync)(path)) {
        const p = (0, node_path_1.join)(path, file);
        const stats = (0, node_fs_1.lstatSync)(p);
        if (stats.isDirectory()) {
            arr.push(...recursiveReaddirSync(p));
        }
        else {
            arr.push(p);
        }
    }
    return arr;
}
//# sourceMappingURL=recursiveReaddirSync.js.map