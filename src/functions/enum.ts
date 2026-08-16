/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import type { EnumLike } from "../structures"

export function enumToArray(x: EnumLike) {
    return Object.keys(x).filter((x) => Number.isNaN(Number(x)))
}

export function resolveNumericEnum(en: EnumLike, value: string | number) {
    return typeof value === "string" ? en[value as keyof typeof en] : value
}
