/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { ArgType, NativeFunction } from "../../structures/@internal/NativeFunction"

export default new NativeFunction({
    name: "$log",
    version: "1.0.0",
    description: "Log something to console",
    unwrap: true,
    args: [
        {
            name: "message",
            description: "The message to log to console",
            rest: true,
            type: ArgType.String,
            required: true,
        },
    ],
    brackets: true,
    execute(_ctx, [args]) {
        console.log(...args)
        return this.success()
    },
})
