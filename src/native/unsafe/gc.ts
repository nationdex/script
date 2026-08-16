/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { execArgv } from "node:process"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$gc",
    version: "1.5.0",
    description: "Triggers JavaScript's garbage collector, only available if passed --expose-gc flag to node",
    unwrap: false,
    output: ArgType.Boolean,
    execute(_ctx) {
        return this.success(execArgv.includes("--expose-gc") ? (gc!(), true) : false)
    },
})
