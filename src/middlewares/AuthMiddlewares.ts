import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


declare global{
    namespace Express{
        interface Request {
            user?: any;
        }
    }
}

const secret = process.env.JWT_SECRET || "minha_chave_secreta";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token não fornecido" });

    try {
        const user = jwt.verify(token, secret);
        req.user = user; 
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado" });
    }
}