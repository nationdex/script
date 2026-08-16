/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { spoiler } from "discord.js"
import { ArgType, NativeFunction } from "../../structures"

export const SpoilerEscapeRegex = /(\|)/gim

export default new NativeFunction({
    name: "$spoiler",
    version: "1.3.0",
    brackets: true,
    description: "Makes given text a spoiler",
    unwrap: true,
    output: ArgType.String,
    args: [
        {
            name: "text",
            description: "The text to make spoiler, this will attempt to escape all |",
            rest: false,
            required: true,
            type: ArgType.String,
        },
    ],
    execute(_ctx, [str]) {
        return this.success(spoiler(str.replace(SpoilerEscapeRegex, "\\$1")))
    },
})
