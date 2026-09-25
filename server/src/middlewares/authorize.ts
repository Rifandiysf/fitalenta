import { Request, Response, NextFunction } from "express";

export function authorize(...allowedRoles: string[]) {
    return (req: Request, res:Response, next:NextFunction) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Anda tidak memiliki akses untuk resource ini",
            })
        }
        next()
    }
}