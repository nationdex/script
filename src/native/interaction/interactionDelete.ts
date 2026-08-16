/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$interactionDelete",
    version: "1.4.0",
    description: "Deletes this interaction's reply",
    unwrap: false,
    async execute(ctx) {
        if (ctx.interaction?.isRepliable()) await ctx.interaction.deleteReply().catch(ctx.noop)
        return this.success()
    },
})
