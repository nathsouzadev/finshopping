import { NextResponse } from 'next/server';
import { purchases } from '@/lib/data';

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Sort by date descending
  const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json(sortedPurchases);
}
