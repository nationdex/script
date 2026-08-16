/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { type BaseChannel, ThreadAutoArchiveDuration, type ThreadOnlyChannel } from "discord.js"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$forumDefaultThreadArchiveDuration",
    version: "2.2.0",
    description: "Returns the default auto archive duration for threads of a forum",
    aliases: ["$forumDefaultThreadAutoArchiveDuration"],
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "channel ID",
            description: "The channel to get default sort order from",
            rest: false,
            type: ArgType.Channel,
            check: (i: BaseChannel) => i.isThreadOnly(),
            required: true,
        },
    ],
    output: ThreadAutoArchiveDuration,
    execute(_ctx, [chan]) {
        return this.success(ThreadAutoArchiveDuration[(chan as ThreadOnlyChannel)?.defaultAutoArchiveDuration!])
    },
})
