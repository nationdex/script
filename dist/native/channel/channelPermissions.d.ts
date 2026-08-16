import type { BaseChannel } from "discord.js";
import { PermissionOverwritesProperty } from "../../properties/permissionOverwrites";
import { ArgType, NativeFunction } from "../../structures";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    required: true;
    type: ArgType.Channel;
    check: (i: BaseChannel) => i is BaseChannel & Record<"permissionOverwrites", unknown>;
}, {
    name: string;
    description: string;
    rest: false;
    required: true;
    type: ArgType.Enum;
    enum: typeof PermissionOverwritesProperty;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
}], true>;
export default _default;
//# sourceMappingURL=channelPermissions.d.ts.map