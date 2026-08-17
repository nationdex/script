"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const structures_1 = require("../../structures");
exports.default = new structures_1.NativeFunction({
    name: "$guildAutomodRulesCount",
    version: "2.7.0",
    description: "Returns the number of automod rules of a guild",
    brackets: false,
    aliases: ["$serverAutomodRulesCount", "$getAutomodRulesCount"],
    output: structures_1.ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to get automod rules count from",
            rest: false,
            type: structures_1.ArgType.Guild,
            required: true,
        },
        {
            name: "trigger",
            description: "The trigger type of the automod rules to count",
            rest: false,
            type: structures_1.ArgType.Enum,
            enum: discord_js_1.AutoModerationRuleTriggerType,
        },
    ],
    async execute(ctx, [guild, trigger]) {
        const rules = await (guild ?? ctx.guild)?.autoModerationRules?.fetch().catch(ctx.noop);
        if (!rules)
            return this.success(0);
        return this.success(trigger !== null ? rules.filter((rule) => rule.triggerType === trigger).size : rules.size);
    },
});
//# sourceMappingURL=guildAutomodRulesCount.js.map