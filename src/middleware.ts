import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define the routes that should be handled by client-side routing
  const clientRoutes = ['/login', '/faqs', '/about'];
  
  // Check if current path is a known client route 
  // and the request accepts HTML (it's a page navigation, not an API call)
  if (clientRoutes.includes(pathname) && request.headers.get('accept')?.includes('text/html')) {
    // Create a new URL pointing to the index page
    const url = request.nextUrl.clone();
    url.pathname = '/';
    
    // Return a rewrite response which keeps the URL the same but serves the content from '/'
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 