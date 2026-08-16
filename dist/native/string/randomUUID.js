"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$randomUUID",
    version: "1.2.0",
    description: "Returns a random uuid",
    unwrap: false,
    output: structures_1.ArgType.String,
    execute() {
        return this.success((0, node_crypto_1.randomUUID)());
    },
});
//# sourceMappingURL=randomUUID.js.map