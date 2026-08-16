import type { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import { type IExtendedCompilationResult } from "../../core";
import { type IApplicationCommandData, RegistrationType } from "../../managers/ApplicationCommandManager";
export declare class ApplicationCommand {
    readonly options: IApplicationCommandData;
    compiled: IExtendedCompilationResult;
    constructor(options: IApplicationCommandData);
    get name(): string;
    get registrationType(): RegistrationType;
    mustRegisterAs(type: Exclude<RegistrationType, RegistrationType.All>): boolean;
    toJSON(): RESTPostAPIApplicationCommandsJSONBody;
}
//# sourceMappingURL=ApplicationCommand.d.ts.map