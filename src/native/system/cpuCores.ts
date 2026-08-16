/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import os from "node:os"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$cpuCores",
    version: "1.0.7",
    output: ArgType.Number,
    description: "Returns the amount of cpu cores",
    unwrap: false,
    execute() {
        return this.success(os.cpus().length)
    },
})
