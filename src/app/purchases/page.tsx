"use client";

import { useState, useEffect } from 'react';
import AppLayout from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { Purchase, CartItem } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { History } from 'lucide-react';

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/purchases');
        if (!response.ok) {
          throw new Error('Failed to fetch purchase history');
        }
        const data = await response.json();
        setPurchases(data);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Erro ao buscar histórico',
          description: 'Não foi possível carregar o histórico de compras.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchases();
  }, [toast]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "'Em' dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR });
  }

  return (
    <AppLayout onNewTransaction={() => {}}>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2">Minhas Compras</h1>
            <p className="text-muted-foreground mb-6">Veja o histórico de todas as suas compras.</p>
            
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : purchases.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-10">
                    <History className="w-16 h-16 text-muted-foreground mb-4" />
                    <CardTitle>Nenhuma compra encontrada</CardTitle>
                    <CardDescription>Você ainda não realizou nenhuma compra.</CardDescription>
                </Card>
            ) : (
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {purchases.map((purchase) => (
                    <AccordionItem value={purchase.id} key={purchase.id} className="bg-card border rounded-lg px-4">
                        <AccordionTrigger>
                            <div className="flex justify-between w-full pr-4">
                                <div>
                                    <p className="font-bold text-lg">Compra #{purchase.id}</p>
                                    <p className="text-sm text-muted-foreground">{formatDate(purchase.date)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-primary">{formatCurrency(purchase.total)}</p>
                                    <Badge variant="secondary">{purchase.items.length} {purchase.items.length === 1 ? 'item' : 'itens'}</Badge>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-2 pt-2">
                             {purchase.items.map((item) => (
                                <div key={item.productId} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {item.quantity} x {formatCurrency(item.price)}
                                        </p>
                                    </div>
                                    <p className="font-semibold">{formatCurrency(item.quantity * item.price)}</p>
                                </div>
                             ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
      </main>
    </AppLayout>
  );
}
