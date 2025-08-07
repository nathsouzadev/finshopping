"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Transaction } from '@/lib/types';
import SummaryCards from '@/components/summary-cards';
import TransactionFilters from '@/components/transaction-filters';
import TransactionList from '@/components/transaction-list';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getApiUrl } from '@/lib/utils';
import AppLayout from '@/components/app-layout';

type Filters = {
  type?: 'income' | 'expense' | 'all';
  category?: string;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<Filters>({ type: 'all', category: 'all' });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    setApiUrl(getApiUrl());
  }, []);

  const fetchTransactions = useCallback(async (currentFilters: Filters) => {
    if (!apiUrl) return;
    setIsLoading(true);
    const params = new URLSearchParams();
    if (currentFilters.type && currentFilters.type !== 'all') {
      params.append('type', currentFilters.type);
    }
    if (currentFilters.category && currentFilters.category !== 'all') {
      params.append('category', currentFilters.category);
    }
    if (currentFilters.startDate) {
      params.append('startDate', currentFilters.startDate.toISOString());
    }
    if (currentFilters.endDate) {
      params.append('endDate', currentFilters.endDate.toISOString());
    }
    if (currentFilters.minAmount) {
      params.append('minAmount', String(currentFilters.minAmount));
    }
    if (currentFilters.maxAmount) {
      params.append('maxAmount', String(currentFilters.maxAmount));
    }

    try {
      const response = await fetch(`${apiUrl}?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao buscar transações',
        description: 'Houve um problema ao carregar os dados. Verifique a URL da API nas configurações ou tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, apiUrl]);

  useEffect(() => {
    fetchTransactions(filters);
  }, [filters, fetchTransactions]);

  const handleNewTransaction = async (newTransactionData: Omit<Transaction, 'id'>) => {
    if (!apiUrl) return;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransactionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      // Re-fetch transactions to show the new one
      fetchTransactions(filters);
      
      toast({
        title: 'Sucesso!',
        description: 'Sua nova transação foi adicionada.',
      });

    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao criar transação',
        description: 'Não foi possível salvar a nova transação. Tente novamente.',
        variant: 'destructive',
      });
    }
  };


  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
        } else {
          acc.expense += transaction.amount;
        }
        acc.balance = acc.income - acc.expense;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  return (
    <AppLayout onNewTransaction={handleNewTransaction}>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <SummaryCards summary={summary} isLoading={isLoading} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <TransactionFilters onFilterChange={setFilters} />
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : (
            <TransactionList transactions={transactions} />
          )}
        </div>
      </main>
    </AppLayout>
  );
}
