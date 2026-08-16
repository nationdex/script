/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { parentPort } from "node:worker_threads"
import { Compiler, Interpreter } from "../../core"
import { FunctionManager } from "../../managers"
import type { IThreadContext } from "../../managers/ThreadManager"
import { BaseCommand } from "../../structures"

FunctionManager.loadNative()
Compiler["setFunctions"](FunctionManager.raw)

export interface IThreadResponse {
    value: string | null
    taskId: number
}

parentPort?.on("message", async (ctx: IThreadContext & { taskId: number }) => {
    const cmd = BaseCommand.from(ctx.code)

    const run = await Interpreter.run({
        // @ts-expect-error
        client: null,
        command: cmd,
        keywords: ctx.keywords,
        environment: ctx.environment,
        data: cmd.compiled.code,
        obj: {},
    })

    parentPort?.postMessage({
        taskId: ctx.taskId,
        value: run,
    })
})
