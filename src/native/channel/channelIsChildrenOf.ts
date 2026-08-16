/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { type BaseChannel, type CategoryChannel, ChannelType } from "discord.js"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$channelIsChildrenOf",
    version: "1.5.0",
    aliases: ["$isChildrenOf"],
    description: "Checks whether given channel is a children of a category",
    output: ArgType.Boolean,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "channel ID",
            description: "The channel to know if is children of category",
            rest: false,
            type: ArgType.Channel,
            required: true,
        },
        {
            name: "category ID",
            description: "The category to check against",
            rest: false,
            type: ArgType.Channel,
            required: true,
            check: (i: BaseChannel) => i.type === ChannelType.GuildCategory,
        },
    ],
    execute(_ctx, [ch, cat]) {
        return this.success((cat as CategoryChannel).children.cache.has(ch.id))
    },
})
