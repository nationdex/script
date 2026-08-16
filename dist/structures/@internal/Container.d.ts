import { type ActionRowBuilder, type ApplicationCommandOptionChoiceData, type ApplicationEmoji, type AttachmentBuilder, AutoModerationActionExecution, BaseChannel, type Channel, type ComponentType, type ContainerBuilder, type ContainerComponentBuilder, EmbedBuilder, type Emoji, type Guild, type GuildEmoji, GuildMember, type GuildScheduledEvent, type Interaction, type InteractionEditReplyOptions, type InteractionReplyOptions, type Invite, Message, type MessageActionRowComponentBuilder, type MessageMentionOptions, type MessageMentionTypes, type MessageReaction, type MessageReplyOptions, type ModalBuilder, type PollData, type Presence, type Role, type SoundboardSound, type Sticker, type StickerResolvable, type ThreadChannelResolvable, User, type VoiceState, WebhookClient } from "discord.js";
export type Sendable = {} | Sticker | GuildScheduledEvent | Role | Presence | Message | User | GuildMember | BaseChannel | Interaction | VoiceState | WebhookClient | GuildEmoji | Guild | MessageReaction | Invite | AutoModerationActionExecution | SoundboardSound | Emoji | ApplicationEmoji;
export declare class Container {
    content?: string;
    embeds: EmbedBuilder[];
    components: (ContainerBuilder | ContainerComponentBuilder)[];
    actionRow?: ActionRowBuilder<MessageActionRowComponentBuilder>;
    inside: ComponentType[];
    reference?: string;
    reply: boolean;
    followUp: boolean;
    edit: boolean;
    silent: boolean;
    ephemeral: boolean;
    tts: boolean;
    update: boolean;
    isComponentsV2: boolean;
    files: AttachmentBuilder[];
    channel?: Channel;
    stickers: StickerResolvable[];
    withResponse: boolean;
    withComponents: boolean;
    modal?: ModalBuilder;
    choices: ApplicationCommandOptionChoiceData<string | number>[];
    allowedMentions: MessageMentionOptions;
    avatarURL?: string;
    username?: string;
    poll?: PollData;
    threadId?: ThreadChannelResolvable;
    threadName?: string;
    appliedTags?: string[];
    deleteIn?: number;
    send<T = unknown>(obj: Sendable, content?: string, messageID?: string): Promise<T | null>;
    isValidMessage(options: MessageReplyOptions & InteractionReplyOptions & InteractionEditReplyOptions): boolean;
    embed(index: number): EmbedBuilder;
    parseMentions(type?: MessageMentionTypes): void;
    unparseMentions(type: MessageMentionTypes): void;
    /**
     * Checks if current context is inside a component builder function.
     * @param type The type of the component to check for.
     * @returns
     */
    isInside(type: ComponentType): boolean;
    reset(): void;
    getOptions<T>(content?: string): T;
}
//# sourceMappingURL=Container.d.ts.map