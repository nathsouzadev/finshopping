import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(products);
}
