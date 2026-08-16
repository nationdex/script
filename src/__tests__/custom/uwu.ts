/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { NativeFunction } from "../../structures/@internal/NativeFunction"

export default new NativeFunction({
    name: "$uwu",
    description: "A uwu function that overrides $guildName",
    unwrap: true,
    execute(_ctx) {
        return this.success("uwu!")
    },
})
