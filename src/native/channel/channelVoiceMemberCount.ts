/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$channelVoiceMemberCount",
    version: "1.4.0",
    description: "Returns the member count that are connected to this voice channel",
    unwrap: true,
    aliases: ["$channelMemberCount"],
    output: ArgType.Number,
    brackets: false,
    args: [
        {
            name: "channel ID",
            description: "The id of the channel",
            rest: false,
            type: ArgType.Channel,
            required: true,
        },
    ],
    execute(ctx, [ch]) {
        const chan = ch ?? ctx.channel
        return this.success(chan?.isVoiceBased() ? chan.members.size : null)
    },
})
