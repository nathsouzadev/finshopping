import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { transactions } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return NextResponse.json({ message: 'Transação não encontrada.' }, { status: 404 });
  }

  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  return NextResponse.json(transaction);
}
