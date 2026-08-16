/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

// biome-ignore lint/correctness/noUnusedImports: required for type inference portability
import type { Entitlement } from "discord.js"
import { EntitlementType } from "discord.js"
import type { IStates } from "../core"
import defineProperties from "../functions/defineProperties"

export enum EntitlementProperty {
    userID = "userID",
    consumed = "consumed",
    guildId = "guildId",
    id = "id",
    skuID = "skuID",
    type = "type",
    endTimestamp = "endTimestamp",
    startTimestamp = "startTimestamp",
    active = "active",
    test = "test",
    guildSubscription = "guildSubscription",
    userSubscription = "userSubscription",
}

export const EntitlementProperties = defineProperties<typeof EntitlementProperty, IStates["entitlement"]>({
    skuID: (i) => i?.skuId,
    type: (i) => EntitlementType[i?.type!],
    id: (i) => i?.id,
    active: (i) => i?.isActive(),
    test: (i) => i?.isTest(),
    guildSubscription: (i) => i?.isGuildSubscription(),
    userSubscription: (i) => i?.isUserSubscription(),
    userID: (i, _sep) => i?.userId,
    consumed: (i, _sep) => i?.consumed,
    guildId: (i, _sep) => i?.guildId,
    endTimestamp: (i, _sep) => i?.endsTimestamp,
    startTimestamp: (i, _sep) => i?.startsTimestamp,
})
