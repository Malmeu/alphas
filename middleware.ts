import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware temporairement désactivé
export function middleware() {}

// Configuration des chemins à intercepter
export const config = {
  matcher: ['/admin/:path*', '/auth/login']
};
