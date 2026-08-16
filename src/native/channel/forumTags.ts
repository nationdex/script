/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import type { BaseChannel, ThreadOnlyChannel } from "discord.js"
import array from "../../functions/array"
import { ForumTagProperties, ForumTagProperty } from "../../properties/forumTag"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$forumTags",
    version: "1.5.0",
    description: "Returns all available tags of a forum",
    unwrap: true,
    output: [ArgType.Json, array<ArgType.Unknown>()],
    args: [
        {
            name: "channel ID",
            description: "The channel to get tags of",
            rest: false,
            type: ArgType.Channel,
            check: (i: BaseChannel) => i.isThreadOnly(),
            required: true,
        },
        {
            name: "property",
            description: "The property to return for every tag",
            rest: false,
            type: ArgType.Enum,
            enum: ForumTagProperty,
        },
        {
            name: "separator",
            description: "The separator to use for every tag property",
            rest: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    execute(_ctx, [ch, prop, sep]) {
        const channel = ch as ThreadOnlyChannel | undefined
        const tags = channel?.availableTags

        return this.successJSON(!prop ? tags : tags?.map((tag) => ForumTagProperties[prop](tag)).join(sep ?? ", "))
    },
})
