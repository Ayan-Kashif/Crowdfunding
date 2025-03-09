import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
 

  // Check if the current path starts with "/admin"
  const isAdminRoute = pathname.startsWith('http://82.29.153.135/admin');
    console.log("Middleware is running on:", pathname); // Debug locally
;


  // Add the admin status to headers
  const response = NextResponse.next();
  response.headers.set('is-admin-route', (isAdminRoute  )? 'true' : 'false');

  return response;
}
