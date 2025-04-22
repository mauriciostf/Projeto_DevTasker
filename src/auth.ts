import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env

if(!JWT_SECRET){
    throw new Error('blabla')
}

const secret: Secret = JWT_SECRET;

export function generateToken(payload: JwtPayload) {
    return jwt.sign(payload, secret, { expiresIn: "1h"});
}

export function verifyToken(token: string) {
    return jwt.verify(token, secret);
}