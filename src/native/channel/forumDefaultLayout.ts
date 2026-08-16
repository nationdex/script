/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { type BaseChannel, ChannelType, type ForumChannel, ForumLayoutType } from "discord.js"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$forumDefaultLayout",
    version: "2.2.0",
    description: "Returns the default layout of a forum",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "channel ID",
            description: "The channel to get default layout from",
            rest: false,
            type: ArgType.Channel,
            check: (i: BaseChannel) => i.type === ChannelType.GuildForum,
            required: true,
        },
    ],
    output: ForumLayoutType,
    execute(_ctx, [chan]) {
        return this.success(ForumLayoutType[(chan as ForumChannel)?.defaultForumLayout])
    },
})
