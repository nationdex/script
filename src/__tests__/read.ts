/*
 * SPDX-License-Identifier: LGPL-3.0-or-later
 * Copyright © 2026 BotForge
 */

import { inspect } from "node:util"
import { Compiler as ExperimentalCompiler } from "../core/Compiler"
import { FunctionManager } from "../managers/FunctionManager"

FunctionManager.loadNative()
ExperimentalCompiler["setFunctions"](FunctionManager.raw)

const code = `
    $let[result;$get[result]$if[$env[token;escaped];\\\\]$env[token;value]]
`

const _bro = `
$modal[botinteract;Agregar un Robot]
$addTextInput[IDinput;ID del bot;Short;yes;ID de tu Robot;;0;20]
$addTextInput[prefixbot;Prefix del bot;Short;yes;Prefix de tu Robot;;0;5]`

const compiled = ExperimentalCompiler["compile"](code)

console.log(inspect(compiled, { depth: 10, colors: true }), compiled.resolve.toString())
