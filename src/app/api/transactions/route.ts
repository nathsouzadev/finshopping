import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { transactions } from '@/lib/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get('type');
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
