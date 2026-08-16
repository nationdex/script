"use strict";
/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_util_1 = require("node:util");
const Compiler_1 = require("../core/Compiler");
const FunctionManager_1 = require("../managers/FunctionManager");
FunctionManager_1.FunctionManager.loadNative();
Compiler_1.Compiler["setFunctions"](FunctionManager_1.FunctionManager.raw);
const code = `
    $let[result;$get[result]$if[$env[token;escaped];\\\\]$env[token;value]]
`;
const _bro = `
$modal[botinteract;Agregar un Robot]
$addTextInput[IDinput;ID del bot;Short;yes;ID de tu Robot;;0;20]
$addTextInput[prefixbot;Prefix del bot;Short;yes;Prefix de tu Robot;;0;5]`;
const compiled = Compiler_1.Compiler["compile"](code);
console.log((0, node_util_1.inspect)(compiled, { depth: 10, colors: true }), compiled.resolve.toString());
//# sourceMappingURL=read.js.map