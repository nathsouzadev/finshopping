import { DollarSign, ArrowUpCircle, ArrowDownCircle, Banknote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';

interface Summary {
  income: number;
  expense: number;
  balance: number;
}

interface SummaryCardsProps {
  summary: Summary;
  isLoading: boolean;
}

const SummaryCard = ({ title, value, icon: Icon, isLoading, valueColorClass, description }: { title: string; value: number; icon: React.ElementType; isLoading: boolean; valueColorClass?: string; description: string; }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </>
        ) : (
          <>
            <div className={`text-2xl font-bold ${valueColorClass}`}>
              {formatCurrency(value)}
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const SummaryCards = ({ summary, isLoading }: SummaryCardsProps) => {
  return (
    <>
      <SummaryCard title="Saldo Atual" value={summary.balance} icon={Banknote} isLoading={isLoading} valueColorClass="text-primary" description="Balanço total de suas contas" />
      <SummaryCard title="Entradas" value={summary.income} icon={ArrowUpCircle} isLoading={isLoading} valueColorClass="text-emerald-600" description="Total de receitas no período" />
      <SummaryCard title="Saídas" value={summary.expense} icon={ArrowDownCircle} isLoading={isLoading} valueColorClass="text-red-600" description="Total de despesas no período" />
      <SummaryCard title="Economia" value={summary.income ? (summary.balance / summary.income) * 100 : 0} icon={DollarSign} isLoading={isLoading} description="Percentual de economia" valueFormatter={(v) => `${v.toFixed(2)}%`} />
    </>
  );
};


// A small refactor to the SummaryCard to handle percentage formatting
const SummaryCardRefactored = ({ title, value, icon: Icon, isLoading, valueColorClass, description, valueFormatter }: { title: string; value: number; icon: React.ElementType; isLoading: boolean; valueColorClass?: string; description: string; valueFormatter?: (value: number) => string; }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const displayValue = valueFormatter ? valueFormatter(value) : formatCurrency(value);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </>
        ) : (
          <>
            <div className={`text-2xl font-bold ${valueColorClass}`}>
              {displayValue}
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};


const SummaryCardsComponent = ({ summary, isLoading }: SummaryCardsProps) => {
  return (
    <>
      <SummaryCardRefactored title="Saldo Atual" value={summary.balance} icon={Banknote} isLoading={isLoading} valueColorClass="text-primary" description="Balanço total de suas contas" />
      <SummaryCardRefactored title="Entradas" value={summary.income} icon={ArrowUpCircle} isLoading={isLoading} valueColorClass="text-emerald-600" description="Total de receitas no período" />
      <SummaryCardRefactored title="Saídas" value={summary.expense} icon={ArrowDownCircle} isLoading={isLoading} valueColorClass="text-red-600" description="Total de despesas no período" />
      <SummaryCardRefactored title="Taxa de Economia" value={summary.income > 0 ? (summary.balance / summary.income) * 100 : 0} icon={DollarSign} isLoading={isLoading} description="Percentual de economia" valueFormatter={(v) => isNaN(v) ? '0.00%' : `${v.toFixed(2)}%`} />
    </>
  );
};


export default SummaryCardsComponent;

