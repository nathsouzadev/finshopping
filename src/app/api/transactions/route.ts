import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { transactions } from '@/lib/data';
import type { Transaction } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const minAmount = searchParams.get('minAmount');
  const maxAmount = searchParams.get('maxAmount');

  let filteredTransactions = [...transactions];

  if (type === 'income' || type === 'expense') {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.type === type
    );
  }

  if (category && category !== 'all') {
    filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.category === category
    );
  }

  if (startDate) {
    const startDateObj = new Date(startDate);
    filteredTransactions = filteredTransactions.filter(
      (transaction) => new Date(transaction.date) >= startDateObj
    );
  }

  if (endDate) {
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999); // Include the whole day
    filteredTransactions = filteredTransactions.filter(
      (transaction) => new Date(transaction.date) <= endDateObj
    );
  }

  if (minAmount) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.amount >= Number(minAmount)
    );
  }

  if (maxAmount) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.amount <= Number(maxAmount)
    );
  }

  // Sort by date descending
  filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  return NextResponse.json(filteredTransactions);
}

export async function POST(request: NextRequest) {
  try {
    const body: Omit<Transaction, 'id'> = await request.json();

    const newTransaction: Transaction = {
      id: String(transactions.length + 1),
      ...body,
      date: new Date(body.date).toISOString(),
    };

    transactions.unshift(newTransaction); // Add to the beginning of the array

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error('Failed to create transaction', error);
    return NextResponse.json({ message: 'Failed to create transaction' }, { status: 500 });
  }
}
