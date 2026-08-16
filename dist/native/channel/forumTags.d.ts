import type { BaseChannel, ThreadOnlyChannel } from "discord.js";
import { ForumTagProperty } from "../../properties/forumTag";
import { ArgType, NativeFunction } from "../../structures";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    type: ArgType.Channel;
    check: (i: BaseChannel) => i is ThreadOnlyChannel;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof ForumTagProperty;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
}], true>;
export default _default;
//# sourceMappingURL=forumTags.d.ts.map