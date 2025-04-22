import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export class AuthMiddleware {
    async authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(" ")[1]; // Bearer <token>
        if (!token) {
            res.status(401).json({ message: "Token não fornecido" });
            return;
        }
        
        try {
            const user = verifyToken(token);
            req.user = user; // Você pode usar isso em rotas depois
            next();
        } catch (error) {
            res.status(403).json({ message: "Token inválido ou expirado" });
            return;
        }
    }
}