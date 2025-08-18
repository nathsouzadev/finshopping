import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { purchases } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const purchase = purchases.find((p) => p.id === id);

  if (!purchase) {
    return NextResponse.json({ message: 'Compra não encontrada.' }, { status: 404 });
  }

  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  return NextResponse.json(purchase);
}
