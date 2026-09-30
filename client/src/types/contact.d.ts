export type ContactPayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export type ContactResponse = {
    success: boolean;
    message?: string;
};

export type ContactErrorBody = {
    success?: false;
    message?: string;
    errors?: Record<string, string | string[]>;
};