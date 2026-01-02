import * as z from "zod";

export const foundrySettingsSchema = z.object({
	foundryName: z.string().min(2, "IDENT_REQUIRED"),
	operatingStatus: z.enum(["LIVE", "MAINTENANCE", "LOCKED"]),
	baseCurrency: z.string().length(3, "ISO_CODE_REQUIRED"),
	unitPrecision: z.number().min(0).max(4),
	globalTransferFee: z.number().min(0),
	shippingNode: z.string().min(3),
	enableVanguardReports: z.boolean(),
	securityLevel: z.enum(["STANDARD", "HIGH_ENCRYPT", "MAX_ISOLATION"]),
	smtpSignalLine: z.email().optional(), // Email for system alerts
	apiSecurityKey: z.string().min(10, "TOKEN_TOO_SHORT"),
	handshakeMode: z.enum(["SIMULATION", "DEPLOYMENT"]), // Test vs Live
	primaryLanguage: z.enum(["EN", "AR"]),
	timezoneNode: z.string(),
	autoAuthorizeIntel: z.boolean(),
	allowNewVanguard: z.boolean(),
});

export type FoundrySettings = z.infer<typeof foundrySettingsSchema>;
