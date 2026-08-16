import { AuditLogEvent, type GuildAuditLogsEntry } from "discord.js";
export declare enum AuditProperty {
    id = "id",
    targetID = "targetID",
    timestamp = "timestamp",
    reason = "reason",
    executorID = "executorID",
    actionType = "actionType",
    targetType = "targetType",
    action = "action",
    changes = "changes",
    extra = "extra"
}
export declare const AuditProperties: import("..").Properties<typeof AuditProperty, GuildAuditLogsEntry<AuditLogEvent, "Update" | "Create" | "Delete" | "All", "Guild" | "Channel" | "User" | "Role" | "Invite" | "Webhook" | "Emoji" | "Message" | "Integration" | "StageInstance" | "Sticker" | "GuildScheduledEvent" | "Thread" | "ApplicationCommand" | "SoundboardSound" | "AutoModeration" | "GuildOnboardingPrompt" | "GuildOnboarding" | "Unknown">>;
//# sourceMappingURL=audit.d.ts.map