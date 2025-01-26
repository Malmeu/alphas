import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Rafraîchir la session si nécessaire
  await supabase.auth.getSession();

  // Vérifier l'authentification pour les routes admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return response;
}

// Configuration des chemins à intercepter
export const config = {
  matcher: ['/admin/:path*', '/auth/login']
};
