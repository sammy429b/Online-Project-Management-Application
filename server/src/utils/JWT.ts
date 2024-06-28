import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


// JWT Token generation
export function JWTsign(payload: number): string | null {
    const JWT_SECRET_KEY = process.env.SECRET_KEY;

    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        return null;
    }

    try {
        const token = jwt.sign({ id: payload }, JWT_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1h',
        });
        console.log(token)
        return token;
    } catch (error) {
        console.error('Error signing JWT:', error);
        return null;
    }
}

// JWT Token verification
export function JWTverify(JWTtoken: string): any {
    const JWT_SECRET_KEY = process.env.SECRET_KEY;

    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        return null;
    }

    try {
        const token = jwt.verify(JWTtoken, JWT_SECRET_KEY,)
        return token;
    } catch (error) {
        console.error('Error signing JWT:', error);
        return null;
    }
}
