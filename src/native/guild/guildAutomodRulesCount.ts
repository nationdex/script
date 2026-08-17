/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { AutoModerationRuleTriggerType } from "discord.js"
import { ArgType, NativeFunction } from "../../structures"

export default new NativeFunction({
    name: "$guildAutomodRulesCount",
    version: "2.7.0",
    description: "Returns the number of automod rules of a guild",
    brackets: false,
    aliases: ["$serverAutomodRulesCount", "$getAutomodRulesCount"],
    output: ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to get automod rules count from",
            rest: false,
            type: ArgType.Guild,
            required: true,
        },
        {
            name: "trigger",
            description: "The trigger type of the automod rules to count",
            rest: false,
            type: ArgType.Enum,
            enum: AutoModerationRuleTriggerType,
        },
    ],
    async execute(ctx, [guild, trigger]) {
        const rules = await (guild ?? ctx.guild)?.autoModerationRules?.fetch().catch(ctx.noop)
        if (!rules) return this.success(0)
        return this.success(trigger !== null ? rules.filter((rule) => rule.triggerType === trigger).size : rules.size)
    },
})
