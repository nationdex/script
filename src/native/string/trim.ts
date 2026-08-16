/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$trim",
    version: "1.0.6",
    aliases: ["$trimSpace"],
    description: "Trims a string",
    brackets: true,
    unwrap: true,
    output: ArgType.String,
    args: [
        {
            name: "text",
            description: "The text to trim",
            rest: false,
            required: true,
            type: ArgType.String,
        },
    ],
    execute(_ctx, [m]) {
        return this.success(m.trim())
    },
})
