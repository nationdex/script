/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { ArgType, NativeFunction } from "../../structures"

const MathRegex = /[^0-9%\-+./*\t\n\s()<>]/

export default new NativeFunction({
    name: "$math",
    version: "1.0.0",
    description: "Runs math expression, returns nothing if incorrect expression",
    brackets: true,
    output: ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "expr",
            description: "The math expression to run",
            rest: false,
            type: ArgType.String,
            required: true,
        },
    ],
    execute(_ctx, [expr]) {
        try {
            if (MathRegex.test(expr)) return this.success()
            return this.success(eval(expr))
        } catch (_error: any) {
            return this.success()
        }
    },
})
