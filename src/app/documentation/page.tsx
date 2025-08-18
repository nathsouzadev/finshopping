"use client";

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto mt-2">
        <code>
            {children}
        </code>
    </pre>
);

export default function DocumentationPage() {
    return (
        <AppLayout onNewTransaction={() => {}}>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="max-w-4xl mx-auto w-full">
                    <h1 className="text-3xl font-bold mb-2">Documentação da API</h1>
                    <p className="text-muted-foreground mb-8">A aplicação utiliza uma API interna para simular operações de backend. Todos os endpoints estão localizados sob o prefixo `/api`.</p>

                    <div className="space-y-8">
                        {/* Products */}
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Produtos</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <Badge variant="secondary">GET</Badge>
                                        <span>/api/products</span>
                                    </h3>
                                    <p className="text-muted-foreground mt-1">Retorna a lista de todos os produtos disponíveis na loja.</p>
                                    <p className="font-semibold mt-4">Resposta de Sucesso (200 OK):</p>
                                    <CodeBlock>{`[
    {
        "id": 1,
        "name": "Notebook Gamer Pro",
        "price": 7500
    },
    ...
]`}</CodeBlock>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Transactions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>2. Transações Financeiras</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <Badge variant="secondary">GET</Badge>
                                        <span>/api/transactions</span>
                                    </h3>
                                    <p className="text-muted-foreground mt-1">Retorna uma lista de transações financeiras, com suporte a filtros.</p>
                                    <p className="font-semibold mt-4">Resposta de Sucesso (200 OK):</p>
                                    <CodeBlock>{`[
    {
        "id": "1",
        "date": "2024-07-15T10:00:00Z",
        "description": "Salário de Julho",
        "amount": 5000,
        "type": "income",
        "category": "Salário"
    },
    ...
]`}</CodeBlock>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <Badge variant="secondary">GET</Badge>
                                        <span>/api/transactions/{'{id}'}</span>
                                    </h3>
                                    <p className="text-muted-foreground mt-1">Retorna uma transação específica pelo seu ID.</p>
                                    <p className="font-semibold mt-4">Resposta de Sucesso (200 OK):</p>
                                    <CodeBlock>{`{
    "id": "1",
    "date": "2024-07-15T10:00:00Z",
    "description": "Salário de Julho",
    "amount": 5000,
    "type": "income",
    "category": "Salário"
}`}</CodeBlock>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <Badge className="bg-sky-600 text-white hover:bg-sky-700">POST</Badge>
                                        <span>/api/transactions</span>
                                    </h3>
                                    <p className="text-muted-foreground mt-1">Cria uma nova transação financeira.</p>
                                    <p className="font-semibold mt-4">Resposta de Sucesso (201 Created):</p>
                                    <CodeBlock>{`{
    "id": "11",
    "description": "Conta de Internet",
    "amount": 99.90,
    "type": "expense",
    "category": "Contas",
    "date": "2024-07-20T11:00:00.000Z"
}`}</CodeBlock>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Purchases */}
                        <Card>
                            <CardHeader>
                                <CardTitle>3. Compras</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <Badge className="bg-sky-600 text-white hover:bg-sky-700">POST</Badge>
                                        <span>/api/checkout</span>
                                    </h3>
                                    <p className="text-muted-foreground mt-1">Processa uma nova compra a partir do carrinho.</p>
                                     <p className="font-semibold mt-4">Resposta de Sucesso (200 OK):</p>
                                    <CodeBlock>{`{
    "message": "Compra processada com sucesso!"
}`}</CodeBlock>
                                    <p className="font-semibold mt-4">Resposta de Erro (400 Bad Request):</p>
                                    <CodeBlock>{`// Se o total exceder 20.000
{
    "message": "O valor total da compra excede o limite de R$20.000."
}`}</CodeBlock>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <Badge variant="secondary">GET</Badge>
                                        <span>/api/purchases</span>
                                    </h3>
                                    <p className="text-muted-foreground mt-1">Retorna o histórico de todas as compras realizadas.</p>
                                     <p className="font-semibold mt-4">Resposta de Sucesso (200 OK):</p>
                                     <CodeBlock>{`[
    {
        "id": "1",
        "date": "2024-07-28T14:45:12Z",
        "total": 7850,
        "items": [
            {
                "productId": 1,
                "quantity": 1,
                "name": "Notebook Gamer Pro",
                "price": 7500
            },
            ...
        ]
    },
    ...
]`}</CodeBlock>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <Badge variant="secondary">GET</Badge>
                                        <span>/api/purchases/{'{id}'}</span>
                                    </h3>
                                    <p className="text-muted-foreground mt-1">Retorna uma compra específica pelo seu ID.</p>
                                    <p className="font-semibold mt-4">Resposta de Sucesso (200 OK):</p>
                                    <CodeBlock>{`{
    "id": "1",
    "date": "2024-07-28T14:45:12Z",
    "total": 7850,
    "items": [
        {
            "productId": 1,
            "quantity": 1,
            "name": "Notebook Gamer Pro",
            "price": 7500
        },
        ...
    ]
}`}</CodeBlock>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </AppLayout>
    )
}
