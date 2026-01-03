// lib/action-utils.ts

import { Prisma } from "@/generated/prisma/client";

/**
 * Technical error codes for the Overseer diagnostic
 */
export const FOUNDRY_ERROR_CODES = {
	CONNECTION_FAILURE: "REGISTRY_SYNC_FAILURE",
	INTEGRITY_VIOLATION: "INTEGRITY_VIOLATION",
	ID_COLLISION: "UID_COLLISION",
	NOT_FOUND: "RECORD_NOT_INITIALIZED",
	UNKNOWN: "SYSTEM_HALT: UNKNOWN_LOGIC_ERROR",
} as const;

export function handleFoundryError(error: unknown): never {
	console.error("FOUNDRY_CRITICAL_LOG:", error);

	// 1. Handle Known Prisma Errors
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		switch (error.code) {
			case "P1001":
			case "P1017":
				throw new Error(`${FOUNDRY_ERROR_CODES.CONNECTION_FAILURE} // DATABASE_OFFLINE`);
			case "P2002":
				throw new Error(`${FOUNDRY_ERROR_CODES.ID_COLLISION} // UNIQUE_CONSTRAINT_FAILED`);
			case "P2003":
				throw new Error(`${FOUNDRY_ERROR_CODES.INTEGRITY_VIOLATION} // MODULE_LINKED_TO_DISPATCHES`);
			case "P2025":
				throw new Error(`${FOUNDRY_ERROR_CODES.NOT_FOUND} // RECORD_NOT_IN_REGISTRY`);
			default:
				throw new Error(`DB_SYNC_ERROR_${error.code} // UNHANDLED_PRISMA_EXCEPTION`);
		}
	}

	// 2. Handle standard JS Errors
	if (error instanceof Error) {
		throw new Error(error.message.toUpperCase());
	}

	// 3. Fallback for untyped errors
	throw new Error(FOUNDRY_ERROR_CODES.UNKNOWN);
}
