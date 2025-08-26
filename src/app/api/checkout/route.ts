import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { purchases } from '@/lib/data';
import { products } from '@/lib/products';
import type { CartItem } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cart, total } = body;

    if (!cart || total === undefined) {
      return NextResponse.json({ message: 'Dados da compra inválidos.' }, { status: 400 });
    }

    if (total > 20000) {
      return NextResponse.json({ message: 'O valor total da compra excede o limite de R$20.000.' }, { status: 400 });
    }

    const items: CartItem[] = (cart || []).map((item: {productId: string, quantity: number}) => {
        const product = products.find(p => p.id === item.productId);
        return {
            ...item,
            name: product?.name || 'Produto desconhecido',
            price: product?.price || 0,
        }
    });

    const newPurchase = {
        id: String(purchases.length + 1),
        date: new Date().toISOString().split('T')[0],
        total,
        items,
    };

    purchases.unshift(newPurchase);

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing delay

    return NextResponse.json(newPurchase, { status: 201 });

  } catch (error) {
    console.error('Erro ao processar a compra:', error);
    return NextResponse.json({ message: 'Ocorreu um erro interno ao processar sua compra.' }, { status: 500 });
  }
}
