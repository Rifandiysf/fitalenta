export type DashboardProgram = {
    id?: number;
    name: string;
    programFormat?: string | null;
};

export type PaymentStatus =
    | "pending"
    | "installment_1"
    | "installment_2"
    | "installment_3"
    | "installment_4"
    | "installment_5"
    | "installment_6"
    | "paid"
    | "overdue"
    | "cancelled";

export type PaymentMethod = "transfer" | "cash" | "credit_card";

export type DashboardPayment = {
    status?: PaymentStatus | null;
    method?: PaymentMethod | null;
    [key: string]: unknown;
};

// Mengikuti enum Prisma
export type RegistrationStatus = "menunggu" | "lolos" | "tidak_lolos";
export type PlacementStage = "proses" | "lolos" | "ditempatkan";

export type DashboardData = {
    program: DashboardProgram | null;
    registrationStatus: RegistrationStatus | null;
    registrationCode: string | null;
    selectionStatus: RegistrationStatus | null;
    placementStatus: PlacementStage | null;
    payment: DashboardPayment | null;
    unreadNotifications: number;
    hasRegistration: boolean;
};