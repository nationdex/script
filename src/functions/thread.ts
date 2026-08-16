/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { once } from "node:events"
import { join } from "node:path"
import { Worker } from "node:worker_threads"

export async function spawn(name: string) {
    const worker = new Worker(join(__dirname, "..", "experimental", "threading", `${name}.js`))
    await once(worker, "online")
    return worker
}

export async function postMessage<T>(worker: Worker, msg: any): Promise<T> {
    worker.postMessage(msg)
    const result = await once(worker, "message").then((x) => x[0])
    return result
}

export async function terminate(...workers: Worker[]) {
    for (const worker of workers) {
        worker.terminate()
        await once(worker, "exit")
    }
}
