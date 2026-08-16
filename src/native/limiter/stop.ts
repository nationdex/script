/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$stop",
    version: "1.0.0",
    description: "Stops code execution",
    unwrap: false,
    execute() {
        return this.stop()
    },
})
