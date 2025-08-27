'use server';

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {message} = body;

    if (!message) {
      return NextResponse.json(
        {message: 'A mensagem não pode estar em branco.'},
        {status: 400}
      );
    }

    // Simula um atraso de processamento da IA
    await new Promise(resolve => setTimeout(resolve, 1500));

    const genericResponse =
      'Esta é uma resposta simulada. Em uma aplicação real, aqui estaria a resposta de um modelo de linguagem avançado para ajudar com suas dúvidas financeiras ou sobre produtos.';

    return NextResponse.json({reply: genericResponse});
  } catch (error) {
    console.error('Erro na API do Chat:', error);
    return NextResponse.json(
      {message: 'Ocorreu um erro interno no servidor.'},
      {status: 500}
    );
  }
}
