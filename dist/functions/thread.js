"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = spawn;
exports.postMessage = postMessage;
exports.terminate = terminate;
const node_events_1 = require("node:events");
const node_path_1 = require("node:path");
const node_worker_threads_1 = require("node:worker_threads");
async function spawn(name) {
    const worker = new node_worker_threads_1.Worker((0, node_path_1.join)(__dirname, "..", "experimental", "threading", `${name}.js`));
    await (0, node_events_1.once)(worker, "online");
    return worker;
}
async function postMessage(worker, msg) {
    worker.postMessage(msg);
    const result = await (0, node_events_1.once)(worker, "message").then((x) => x[0]);
    return result;
}
async function terminate(...workers) {
    for (const worker of workers) {
        worker.terminate();
        await (0, node_events_1.once)(worker, "exit");
    }
}
//# sourceMappingURL=thread.js.map