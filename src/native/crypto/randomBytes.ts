/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { randomBytes } from "node:crypto"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$randomBytes",
    version: "1.5.0",
    description: "Generates a string of random bytes, in hex",
    brackets: true,
    output: ArgType.String,
    args: [
        {
            name: "length",
            description: "The length of the hex string",
            rest: false,
            required: true,
            type: ArgType.Number,
        },
    ],
    unwrap: true,
    execute(_ctx, [len]) {
        return this.success(randomBytes(len).toString("hex"))
    },
})
