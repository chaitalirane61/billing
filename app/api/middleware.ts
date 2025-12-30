import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
    // Skip authentication for login and register routes
    if (request.nextUrl.pathname.startsWith('/api/auth/login') ||
        request.nextUrl.pathname.startsWith('/api/auth/register')) {
        return NextResponse.next();
    }

    // Allow public POST to /api/leads (contact form submission)
    if (request.nextUrl.pathname === '/api/admin/leads' && request.method === 'POST') {
        return NextResponse.next();
    }

    // Require authentication for all admin routes and GET requests
    if (request.nextUrl.pathname.startsWith('/api/admin') ||
        (request.nextUrl.pathname.startsWith('/api/') && request.method === 'GET')) {
        
        const authHeader = request.headers.get('authorization');
        const token = extractToken(authHeader);

        if (!token) {
            return NextResponse.json({
                success: false,
                error: 'Authentication required'
            }, { status: 401 });
        }

        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json({
                success: false,
                error: 'Invalid or expired token'
            }, { status: 401 });
        }

        // Add user info to request headers for downstream use
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.userId.toString());
        requestHeaders.set('x-user-role', payload.role);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
}
