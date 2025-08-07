import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

    // Simulate processing the order
    console.log('Pedido recebido:', { cart, total });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing delay

    return NextResponse.json({ message: 'Compra processada com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao processar a compra:', error);
    return NextResponse.json({ message: 'Ocorreu um erro interno ao processar sua compra.' }, { status: 500 });
  }
}
