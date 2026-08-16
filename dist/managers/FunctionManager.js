"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionManager = void 0;
const node_path_1 = require("node:path");
const node_v8_1 = require("node:v8");
const core_1 = require("../core");
const enum_1 = require("../functions/enum");
const recursiveReaddirSync_1 = __importDefault(require("../functions/recursiveReaddirSync"));
const Logger_1 = require("../structures/@internal/Logger");
const NativeFunction_1 = require("../structures/@internal/NativeFunction");
class FunctionManager {
    static Functions = new Map();
    static loadNative() {
        FunctionManager.load("ForgeScript", (0, node_path_1.join)(__dirname, "..", "native"));
    }
    static load(provider, path) {
        // Backwards compatibility smh
        if (!path)
            return FunctionManager.load("Unknown", provider);
        const overrideAttempts = [];
        const loader = [];
        for (const file of (0, recursiveReaddirSync_1.default)(path).filter((x) => (x.endsWith(".js") || x.endsWith(".ts") || x.endsWith(".cjs") || x.endsWith(".mjs")) &&
            !x.endsWith(".d.ts"))) {
            const resolvedPath = (0, node_path_1.resolve)(file);
            const req = require(resolvedPath).default;
            req.path = file;
            if (FunctionManager.Functions.has(req.name)) {
                overrideAttempts.push(req.name);
                continue;
            }
            if (!req.data.args?.length)
                req.data.unwrap = false;
            loader.push(req);
        }
        FunctionManager.addMany(loader);
        if (overrideAttempts.length !== 0)
            Logger_1.Logger.warn(`${provider} | Attempted to override the following ${overrideAttempts.length} functions: ${overrideAttempts.join(", ")}`);
    }
    static addMany(...fns) {
        for (let i = 0, len = fns.length; i < len; i++) {
            const fn = fns[i];
            if (Array.isArray(fn))
                FunctionManager.addMany(...fn);
            else
                FunctionManager.Functions.set(fn.name, fn);
        }
        FunctionManager.reload();
    }
    static add(fn) {
        return FunctionManager.addMany(fn);
    }
    static reload() {
        core_1.Compiler["setFunctions"](FunctionManager.raw);
    }
    static get(name) {
        return FunctionManager.Functions.get(name);
    }
    static toJSON() {
        return Array.from(FunctionManager.Functions.values()).map((x) => {
            const d = { ...x.data };
            d.args?.forEach((x) => {
                Reflect.deleteProperty(x, "check");
            });
            Reflect.deleteProperty(d, "execute");
            const data = (0, node_v8_1.deserialize)(new Uint8Array((0, node_v8_1.serialize)(d)));
            data.args?.forEach((x) => {
                x.type = NativeFunction_1.ArgType[x.type];
                if (x.enum)
                    x.enum = (0, enum_1.enumToArray)(x.enum);
            });
            return data;
        });
    }
    static get raw() {
        return Array.from(FunctionManager.Functions).map((x) => {
            const [name, { data }] = x;
            return {
                aliases: data.aliases ?? null,
                name,
                args: data.brackets === undefined
                    ? null
                    : {
                        required: data.brackets,
                        fields: data.args.map((x) => ({
                            condition: x.condition,
                            rest: x.rest,
                        })),
                    },
            };
        });
    }
}
exports.FunctionManager = FunctionManager;
//# sourceMappingURL=FunctionManager.js.map