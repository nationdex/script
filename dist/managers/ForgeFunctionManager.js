"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeFunctionManager = void 0;
const node_path_1 = require("node:path");
const recursiveReaddirSync_1 = __importDefault(require("../functions/recursiveReaddirSync"));
const ForgeFunction_1 = require("../structures/forge/ForgeFunction");
const FunctionManager_1 = require("./FunctionManager");
class ForgeFunctionManager {
    client;
    functions = new Map();
    constructor(client) {
        this.client = client;
    }
    add(...options) {
        for (let i = 0, len = options.length; i < len; i++) {
            const option = options[i];
            if (Array.isArray(option))
                this.add(...option);
            else {
                const opt = this.resolve(option);
                this.functions.set(opt.data.name, opt);
            }
        }
        this.populate();
    }
    resolve(s) {
        return s instanceof ForgeFunction_1.ForgeFunction ? s : new ForgeFunction_1.ForgeFunction(s);
    }
    populate() {
        FunctionManager_1.FunctionManager.addMany(Array.from(this.functions.values()).map((x) => x.asNative()));
    }
    get(name) {
        return this.functions.get(name);
    }
    load(path) {
        const loader = [];
        for (const file of (0, recursiveReaddirSync_1.default)(path).filter((x) => (x.endsWith(".js") || x.endsWith(".ts") || x.endsWith(".cjs") || x.endsWith(".mjs")) &&
            !x.endsWith(".d.ts"))) {
            const filePath = (0, node_path_1.resolve)(file);
            const data = require(filePath);
            if (Object.keys(data).length === 0)
                continue;
            const req = (data.default ?? data);
            loader.push(req);
        }
        this.add(loader);
    }
}
exports.ForgeFunctionManager = ForgeFunctionManager;
//# sourceMappingURL=ForgeFunctionManager.js.map