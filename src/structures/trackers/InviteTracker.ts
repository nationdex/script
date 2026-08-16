/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import {
    type ClientEvents,
    Collection,
    type GatewayIntentsString,
    type Guild,
    type GuildMember,
    type Invite,
    type PartialGuildMember,
} from "discord.js"
import type { ForgeClient } from "../../core"
import noop from "../../functions/noop"
import { NativeEventName } from "../../managers"
import { Logger } from "../@internal/Logger"
import { ErrorType, ForgeError } from "../forge/ForgeError"

export interface IGuildInviter {
    inviterId: string
    code: string
}

export interface IGuildInvite {
    uses: number
    userId: string
    code: string
}

export class InviteTracker {
    public static readonly Invites = new Collection<string, IGuildInvite[]>()

    public static readonly RequiredIntents = ["Guilds", "GuildInvites", "GuildMembers"] as GatewayIntentsString[]

    public static readonly RequiredEvents = [
        "inviteCreate",
        "inviteDelete",
        "guildMemberAdd",
        "guildMemberUpdate",
        "guildMemberRemove",
        "guildCreate",
        "guildDelete",
    ] as (keyof ClientEvents)[]

    /**
     * Guild => invited user => invited by
     */
    public static readonly Inviters = new Collection<string, Collection<string, IGuildInviter>>()

    private static init(client: ForgeClient) {
        if (!client.options.intents.has(InviteTracker.RequiredIntents))
            throw new ForgeError(
                null,
                ErrorType.Custom,
                `The next intents must be enabled: ${InviteTracker.RequiredIntents.join(", ")}`
            )

        client.events.load(NativeEventName, InviteTracker.RequiredEvents)
        Logger.warn("The Invite Tracker is still beta, correct functionality is not guaranteed")
    }

    public static hasPermissions(guild: Guild) {
        return guild.members.me!.permissions.has("ManageGuild")
    }

    public static uncache(guild: Guild) {
        InviteTracker.Invites.delete(guild.id)
        InviteTracker.Inviters.delete(guild.id)
    }

    public static async cacheAll(client: ForgeClient) {
        for (const [, guild] of client.guilds.cache) {
            await InviteTracker.cache(guild)
        }
    }

    public static async cache(guild: Guild) {
        const invites = InviteTracker.hasPermissions(guild) ? await guild.invites.fetch().catch(noop) : undefined

        if (!invites) {
            Logger.warn(`Failed to cache invites for guild ${guild.name}.`)
            return
        }

        const arr: IGuildInvite[] = []

        for (const [, invite] of invites) {
            if (invite.uses === null || invite.inviterId === null) continue

            arr.push({
                uses: invite.uses!,
                code: invite.code,
                userId: invite.inviterId,
            })
        }

        InviteTracker.Invites.set(guild.id, arr)
    }

    public static async inviteCreateHandler(invite: Invite) {
        const invites = InviteTracker.Invites.get(invite.guild?.id!)
        if (invites !== undefined) {
            invites.push({
                code: invite.code,
                userId: invite.inviterId!,
                uses: 0,
            })

            return
        }

        // Cache
        await InviteTracker.cache(invite.guild as Guild)
    }

    public static async inviteDeleteHandler(invite: Invite) {
        const invites = InviteTracker.Invites.get(invite.guild?.id!)
        if (!invites) return
        const index = invites.findIndex((x) => x.code === invite.code)
        if (index !== -1) invites.splice(index, 1)
    }

    public static deleteInviter(member: GuildMember | PartialGuildMember) {
        InviteTracker.Inviters.get(member.guild.id)?.delete(member.id)
    }

    public static async findInviter(member: GuildMember | PartialGuildMember) {
        const guild = member.guild

        const newInvites = await guild.invites.fetch().catch(noop)
        const oldInvites = InviteTracker.Invites.get(guild.id)

        if (!newInvites || !oldInvites) {
            Logger.warn(`Failed to cache invites for guild ${guild.name}.`)
            return
        }

        let used: IGuildInvite | null = null

        for (let i = 0, len = oldInvites.length; i < len; i++) {
            const old = oldInvites[i]
            const inv = newInvites.get(old.code)

            // Invite does no longer exist
            if (!inv) {
                continue
            }

            if (old.uses !== inv.uses) {
                used = old
                old.uses = inv.uses!
                break
            }
        }

        if (used !== null) {
            const invitedUsers = InviteTracker.Inviters.ensure(guild.id, () => new Collection())

            invitedUsers.set(member.id, {
                code: used.code,
                inviterId: used.userId,
            })
        } else Logger.warn(`Could not resolve the invitation used by ${member.displayName} (${member.id}).`)
    }
}
