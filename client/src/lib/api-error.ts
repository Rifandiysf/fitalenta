export class ApiError extends Error {
    readonly status?: number;
    readonly code?: string;

    constructor(message: string, options: { status?: number; code?: string } = {}) {
        super(message);
        this.name = "ApiError";
        this.status = options.status;
        this.code = options.code;
    }
}

export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}
