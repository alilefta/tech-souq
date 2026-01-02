import * as z from "zod";

export const sectorSchema = z.object({
	name: z.string().min(2, "IDENT_REQUIRED"),
	arabicName: z.string().min(2, "CULTURAL_TAG_REQUIRED"),
	slug: z.string().min(2, "SLUG_REQUIRED"),
	description: z.string().optional(),
	gridDisplay: z.enum(["small", "medium", "large", "tall"]),
	imageUrl: z.url().optional().or(z.literal("")),
});

export const editSectorSchema = sectorSchema.extend({
	id: z.number(),
});

export type SectorData = z.infer<typeof sectorSchema>;
export type EditSectorData = z.infer<typeof editSectorSchema>;
