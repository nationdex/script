"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_worker_threads_1 = require("node:worker_threads");
const core_1 = require("../../core");
const managers_1 = require("../../managers");
const structures_1 = require("../../structures");
managers_1.FunctionManager.loadNative();
core_1.Compiler["setFunctions"](managers_1.FunctionManager.raw);
node_worker_threads_1.parentPort?.on("message", async (ctx) => {
    const cmd = structures_1.BaseCommand.from(ctx.code);
    const run = await core_1.Interpreter.run({
        // @ts-expect-error
        client: null,
        command: cmd,
        keywords: ctx.keywords,
        environment: ctx.environment,
        data: cmd.compiled.code,
        obj: {},
    });
    node_worker_threads_1.parentPort?.postMessage({
        taskId: ctx.taskId,
        value: run,
    });
});
//# sourceMappingURL=thread.js.map