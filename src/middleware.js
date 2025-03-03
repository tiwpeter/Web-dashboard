import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();

  res.headers.set('Access-Control-Allow-Origin', '*');  // อนุญาตทุก origin
  res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return res;
}

// กำหนดให้ middleware ใช้เฉพาะ API Routes
export const config = {
  matcher: ['/api/:path*', '/api/products/onSale'], // ใช้กับหลายเส้นทาง
};