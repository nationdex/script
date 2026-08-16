/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { randomUUID } from "node:crypto"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$randomUUID",
    version: "1.2.0",
    description: "Returns a random uuid",
    unwrap: false,
    output: ArgType.String,
    execute() {
        return this.success(randomUUID())
    },
})
