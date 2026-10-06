// Bentuk data sementara untuk tampilan. Sesuaikan setelah sistem/API-nya jelas.
export type SelectionStatus =
    | "pending"
    | "screening"
    | "interview"
    | "accepted"
    | "rejected";

export type Placement = {
    company?: string | null;
    location?: string | null;
};

export type MyRegistration = {
    id: number;
    status: SelectionStatus;
    createdAt: string;
    program: { id: number; name: string };
    placement?: Placement | null;
};