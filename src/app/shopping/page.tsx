"use client";

import { useState, useMemo } from 'react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/lib/products';
import type { Product } from '@/lib/types';
import { MinusCircle, PlusCircle, ShoppingCart } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


export default function ShoppingPage() {
  const [cart, setCart] = useState<Map<number, number>>(new Map());
  const { toast } = useToast();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleQuantityChange = (product: Product, change: number) => {
    const newCart = new Map(cart);
    const currentQuantity = newCart.get(product.id) || 0;
    const newQuantity = currentQuantity + change;

    if (newQuantity > 0) {
      newCart.set(product.id, newQuantity);
    } else {
      newCart.delete(product.id);
    }
    setCart(newCart);
  };
  
  const total = useMemo(() => {
    let total = 0;
    for (const [productId, quantity] of cart.entries()) {
      const product = products.find(p => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    }
    return total;
  }, [cart]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const handleCheckout = () => {
    if (total <= 0) {
      toast({
        title: 'Carrinho vazio',
        description: 'Adicione itens ao carrinho antes de comprar.',
        variant: 'destructive',
      });
      return;
    }
    setIsAlertOpen(true);
  };
  
  const handleConfirmPurchase = () => {
    console.log('Compra confirmada:', { cart, total });
    setIsAlertOpen(false);
    setCart(new Map());
    toast({
        title: 'Compra realizada com sucesso!',
        description: `O valor total da sua compra foi de ${formatCurrency(total)}.`,
    });
  }

  return (
    <AppLayout onNewTransaction={() => {}}>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2">Shopping</h1>
            <p className="text-muted-foreground mb-6">Selecione os melhores produtos de tecnologia.</p>
            <Card>
                <CardHeader>
                    <CardTitle>Produtos</CardTitle>
                    <CardDescription>
                        Escolha a quantidade de cada item que deseja comprar.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm text-muted-foreground">{formatCurrency(product.price)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(product, -1)} disabled={(cart.get(product.id) || 0) === 0}>
                                    <MinusCircle className="h-5 w-5" />
                                </Button>
                                <span className="w-10 text-center font-bold">{cart.get(product.id) || 0}</span>
                                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(product, 1)}>
                                    <PlusCircle className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
                <Separator className="my-4" />
                <CardFooter className="flex flex-col items-end gap-4">
                   <div className="text-xl font-bold">
                        Total: {formatCurrency(total)}
                   </div>
                   <Button onClick={handleCheckout} disabled={total <= 0}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Comprar
                   </Button>
                </CardFooter>
            </Card>
        </div>
      </main>

       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Compra</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja finalizar a compra no valor de{" "}
              <span className="font-bold">{formatCurrency(total)}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setIsAlertOpen(false)}>Cancelar</Button>
            <AlertDialogAction onClick={handleConfirmPurchase}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
