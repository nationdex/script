/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { join } from "node:path"
import { ComponentType, GatewayIntentBits, StickerFormatType } from "discord.js"
import generateMetadata from "./functions/generateMetadata"
import { NativeEventName } from "./managers"
import type { EnumLike } from "./structures"

const expose = {
    GatewayIntentBits: GatewayIntentBits,
    StickerFormatType: StickerFormatType,
    ComponentType: ComponentType,
} satisfies Record<string, EnumLike>

generateMetadata(
    join(__dirname, "native"),
    "native",
    NativeEventName,
    false,
    expose,
    join(__dirname, "handlers", "events")
)
