/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import type { ArgType } from "../structures"

export default function <_T extends ArgType>(value?: any) {
    return value ?? null
}
