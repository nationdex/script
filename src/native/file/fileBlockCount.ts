/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { statSync } from "node:fs"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$fileBlockCount",
    version: "1.4.0",
    description: "Gets block count of a file or directory",
    brackets: true,
    unwrap: true,
    output: ArgType.Number,
    args: [
        {
            name: "path",
            description: "The path to file or directory",
            required: true,
            rest: false,
            type: ArgType.String,
        },
    ],
    execute(_ctx, [path]) {
        return this.success(statSync(path).blocks)
    },
})
