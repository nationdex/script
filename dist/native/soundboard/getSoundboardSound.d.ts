import { SoundboardSoundProperty } from "../../properties/sound";
import { ArgType, NativeFunction } from "../../structures";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    required: true;
    type: ArgType.Guild;
}, {
    name: string;
    description: string;
    rest: false;
    required: true;
    type: ArgType.SoundboardSound;
    pointer: number;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof SoundboardSoundProperty;
}], true>;
export default _default;
//# sourceMappingURL=getSoundboardSound.d.ts.map