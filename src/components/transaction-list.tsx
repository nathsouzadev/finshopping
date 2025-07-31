"use client";

import type { Transaction } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Tag } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-10">
        <Wallet className="w-16 h-16 text-muted-foreground mb-4" />
        <CardTitle>Nenhuma transação encontrada</CardTitle>
        <CardDescription>Tente ajustar seus filtros ou adicione uma nova transação.</CardDescription>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM, yyyy", { locale: ptBR });
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => {
        const isIncome = transaction.type === 'income';
        return (
          <Card key={transaction.id}>
            <CardContent className="p-4 grid grid-cols-[2rem_1fr_auto] items-center gap-4">
              <div>
                {isIncome ? (
                  <ArrowUpCircle className="h-6 w-6 text-emerald-500" />
                ) : (
                  <ArrowDownCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div className="grid gap-1">
                <p className="font-semibold">{transaction.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="font-normal">{transaction.category}</Badge>
                  <span>&bull;</span>
                  <p>
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className={cn(
                "font-bold text-lg text-right",
                isIncome ? "text-emerald-600" : "text-red-600"
              )}>
                {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TransactionList;
