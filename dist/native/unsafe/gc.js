"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$gc",
    version: "1.5.0",
    description: "Triggers JavaScript's garbage collector, only available if passed --expose-gc flag to node",
    unwrap: false,
    output: structures_1.ArgType.Boolean,
    execute(_ctx) {
        return this.success(node_process_1.execArgv.includes("--expose-gc") ? (gc(), true) : false);
    },
});
//# sourceMappingURL=gc.js.map