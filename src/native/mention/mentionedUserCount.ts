/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$mentionedUserCount",
    aliases: ["$mentionedUsersCount"],
    output: ArgType.Number,
    version: "1.3.0",
    description: "Returns the mentioned user count",
    unwrap: false,
    execute(ctx) {
        return this.success(ctx.message?.mentions.users.size)
    },
})
