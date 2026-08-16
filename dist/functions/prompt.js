"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const node_process_1 = require("node:process");
const node_readline_1 = require("node:readline");
async function default_1(q) {
    const itf = (0, node_readline_1.createInterface)(node_process_1.stdin, node_process_1.stdout);
    return new Promise((r) => {
        itf.question(q, (input) => {
            itf.close();
            r(input);
        });
    });
}
//# sourceMappingURL=prompt.js.map