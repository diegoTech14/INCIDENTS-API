import { jwtPayload } from "../interfaces/userInterfaces";
import jwt from "jsonwebtoken";

export class JwtController {

    private secret: string = process.env.SECRET_KEY || "";

    constructor() {
        if (!this.secret) {
            throw new Error("SECRET_KEY is not configured");
        }
    }

    jwtEncoder(payload: jwtPayload): string | null {
        try {
            return jwt.sign(payload, this.secret, { expiresIn: "5h" });
        } catch (error) {
            throw new Error("Failed to generate JWT.");
        }
    }

    //decoder
    jwtDecoder(token: string): jwtPayload | null {
        try {
            if (!token) {
                throw new Error("TOKEN is required");
            }
            
            const decodedToken = jwt.verify(token, this.secret);
            if (
                decodedToken && typeof decodedToken === "object" &&
                "user_dni" in decodedToken &&
                "roles" in decodedToken
            ) {
                return decodedToken as jwtPayload;
            }
            return null;
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                console.error("Token expired");
            } else if (error.name === "JsonWebTokenError") {
                console.error("Invalid signature");
            } else {
                console.error("Token verification failed:", error);
            }

            return null;
        }
    }
}

export default JwtController;