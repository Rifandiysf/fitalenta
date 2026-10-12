import { PlacementStage, RegistrationStatus } from "../../generated/prisma/client";

export const SELECTION_PLACEMENT_LIMITS = { notes: 5000, companyName: 191 } as const;

export const DEFAULT_SELECTION_STATUS: RegistrationStatus = "menunggu";
export const PASSED_SELECTION_STATUS: RegistrationStatus = "lolos";
export const DEFAULT_PLACEMENT_STATUS: PlacementStage = "proses";

export const COMPANY_REQUIRED_PLACEMENT_STATUSES: PlacementStage[] = ["lolos", "ditempatkan"];
export const DATE_REQUIRED_PLACEMENT_STATUSES: PlacementStage[] = ["ditempatkan"];