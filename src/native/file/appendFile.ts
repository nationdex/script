/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { appendFileSync } from "node:fs"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$appendFile",
    version: "1.0.0",
    description: "Appends text to a file",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "path",
            description: "The path to the file",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "text",
            description: "The text to append",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "encoding",
            description: "The encoding to use for text",
            rest: false,
            type: ArgType.String,
        },
    ],
    execute(_ctx, [path, data, encoding]) {
        appendFileSync(path, data, { encoding: (encoding as BufferEncoding) || "utf-8" })
        return this.success()
    },
})
