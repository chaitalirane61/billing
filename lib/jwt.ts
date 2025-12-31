import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export interface JwtPayload {
    userId: number;
    username: string;
    email: string;
    role: string;
}

function parseExpiry(expiry: string): number {
    // "24h" -> 24*60*60 = 86400
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) return 86400; // default 24h in seconds
    const value = parseInt(match[1], 10);
    switch (match[2]) {
        case 's': return value;
        case 'm': return value * 60;
        case 'h': return value * 3600;
        case 'd': return value * 86400;
        default: return 86400;
    }
}

export function generateToken(payload: JwtPayload): string {
    const options: SignOptions = { expiresIn: parseExpiry(JWT_EXPIRES_IN) };
    return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

export function extractToken(authHeader: string | null): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    return authHeader.substring(7);
}
