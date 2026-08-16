"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteTracker = void 0;
const discord_js_1 = require("discord.js");
const noop_1 = __importDefault(require("../../functions/noop"));
const managers_1 = require("../../managers");
const Logger_1 = require("../@internal/Logger");
const ForgeError_1 = require("../forge/ForgeError");
class InviteTracker {
    static Invites = new discord_js_1.Collection();
    static RequiredIntents = ["Guilds", "GuildInvites", "GuildMembers"];
    static RequiredEvents = [
        "inviteCreate",
        "inviteDelete",
        "guildMemberAdd",
        "guildMemberUpdate",
        "guildMemberRemove",
        "guildCreate",
        "guildDelete",
    ];
    /**
     * Guild => invited user => invited by
     */
    static Inviters = new discord_js_1.Collection();
    static init(client) {
        if (!client.options.intents.has(InviteTracker.RequiredIntents))
            throw new ForgeError_1.ForgeError(null, ForgeError_1.ErrorType.Custom, `The next intents must be enabled: ${InviteTracker.RequiredIntents.join(", ")}`);
        client.events.load(managers_1.NativeEventName, InviteTracker.RequiredEvents);
        Logger_1.Logger.warn("The Invite Tracker is still beta, correct functionality is not guaranteed");
    }
    static hasPermissions(guild) {
        return guild.members.me.permissions.has("ManageGuild");
    }
    static uncache(guild) {
        InviteTracker.Invites.delete(guild.id);
        InviteTracker.Inviters.delete(guild.id);
    }
    static async cacheAll(client) {
        for (const [, guild] of client.guilds.cache) {
            await InviteTracker.cache(guild);
        }
    }
    static async cache(guild) {
        const invites = InviteTracker.hasPermissions(guild) ? await guild.invites.fetch().catch(noop_1.default) : undefined;
        if (!invites) {
            Logger_1.Logger.warn(`Failed to cache invites for guild ${guild.name}.`);
            return;
        }
        const arr = [];
        for (const [, invite] of invites) {
            if (invite.uses === null || invite.inviterId === null)
                continue;
            arr.push({
                uses: invite.uses,
                code: invite.code,
                userId: invite.inviterId,
            });
        }
        InviteTracker.Invites.set(guild.id, arr);
    }
    static async inviteCreateHandler(invite) {
        const invites = InviteTracker.Invites.get(invite.guild?.id);
        if (invites !== undefined) {
            invites.push({
                code: invite.code,
                userId: invite.inviterId,
                uses: 0,
            });
            return;
        }
        // Cache
        await InviteTracker.cache(invite.guild);
    }
    static async inviteDeleteHandler(invite) {
        const invites = InviteTracker.Invites.get(invite.guild?.id);
        if (!invites)
            return;
        const index = invites.findIndex((x) => x.code === invite.code);
        if (index !== -1)
            invites.splice(index, 1);
    }
    static deleteInviter(member) {
        InviteTracker.Inviters.get(member.guild.id)?.delete(member.id);
    }
    static async findInviter(member) {
        const guild = member.guild;
        const newInvites = await guild.invites.fetch().catch(noop_1.default);
        const oldInvites = InviteTracker.Invites.get(guild.id);
        if (!newInvites || !oldInvites) {
            Logger_1.Logger.warn(`Failed to cache invites for guild ${guild.name}.`);
            return;
        }
        let used = null;
        for (let i = 0, len = oldInvites.length; i < len; i++) {
            const old = oldInvites[i];
            const inv = newInvites.get(old.code);
            // Invite does no longer exist
            if (!inv) {
                continue;
            }
            if (old.uses !== inv.uses) {
                used = old;
                old.uses = inv.uses;
                break;
            }
        }
        if (used !== null) {
            const invitedUsers = InviteTracker.Inviters.ensure(guild.id, () => new discord_js_1.Collection());
            invitedUsers.set(member.id, {
                code: used.code,
                inviterId: used.userId,
            });
        }
        else
            Logger_1.Logger.warn(`Could not resolve the invitation used by ${member.displayName} (${member.id}).`);
    }
}
exports.InviteTracker = InviteTracker;
//# sourceMappingURL=InviteTracker.js.map