import type { Transaction } from './types';

export const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024-07-15T10:00:00Z',
    description: 'Salário de Julho',
    amount: 5000,
    type: 'income',
  },
  {
    id: '2',
    date: '2024-07-15T12:30:00Z',
    description: 'Aluguel',
    amount: 1500,
    type: 'expense',
  },
  {
    id: '3',
    date: '2024-07-16T09:00:00Z',
    description: 'Compras no Supermercado',
    amount: 350.75,
    type: 'expense',
  },
  {
    id: '4',
    date: '2024-07-17T18:00:00Z',
    description: 'Venda de item usado',
    amount: 120,
    type: 'income',
  },
  {
    id: '5',
    date: '2024-07-18T20:00:00Z',
    description: 'Jantar fora',
    amount: 85.5,
    type: 'expense',
  },
  {
    id: '6',
    date: '2024-07-20T11:00:00Z',
    description: 'Conta de Internet',
    amount: 99.9,
    type: 'expense',
  },
  {
    id: '7',
    date: '2024-07-22T14:00:00Z',
    description: 'Reembolso de despesa',
    amount: 50,
    type: 'income',
  },
  {
    id: '8',
    date: '2024-07-25T08:00:00Z',
    description: 'Gasolina',
    amount: 180,
    type: 'expense',
  },
  {
    id: '9',
    date: '2024-08-01T10:00:00Z',
    description: 'Pagamento Freelance',
    amount: 800,
    type: 'income',
  },
  {
    id: '10',
    date: '2024-08-02T15:00:00Z',
    description: 'Ingressos para show',
    amount: 250,
    type: 'expense',
  },
];
