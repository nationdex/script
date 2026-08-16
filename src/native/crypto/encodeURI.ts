/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$encodeURI",
    version: "1.0.0",
    description: "Encodes text for a url",
    brackets: true,
    unwrap: true,
    output: ArgType.String,
    args: [
        {
            name: "text",
            description: "The text to encode",
            rest: false,
            required: true,
            type: ArgType.String,
        },
    ],
    execute(_ctx, [text]) {
        return this.success(encodeURI(text))
    },
})
