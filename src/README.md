# FinShopping - Gerenciador Financeiro e Loja

Este é um aplicativo de gerenciamento financeiro pessoal combinado com uma interface de compras, construído com Next.js, TypeScript e Tailwind CSS.

## Iniciando o Projeto

Siga estas instruções para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  Clone o repositório para sua máquina local.
2.  Navegue até o diretório do projeto:
    ```bash
    cd nome-do-projeto
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando Localmente

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) em seu navegador para ver a aplicação em funcionamento.

---

## Documentação da API

A aplicação utiliza uma API interna para simular operações de backend. Todos os endpoints estão localizados sob o prefixo `/api`.

### 1. Produtos

#### `GET /api/products`

Retorna la lista de todos os produtos disponíveis na loja.

- **Método:** `GET`
- **Resposta de Sucesso (200 OK):**
  ```json
  [
    {
      "id": 1,
      "name": "Notebook Gamer Pro",
      "price": 7500
    },
    {
      "id": 2,
      "name": "Mouse Sem Fio Ultra-leve",
      "price": 350
    },
    {
      "id": 3,
      "name": "Teclado Mecânico RGB",
      "price": 550
    },
    {
      "id": 4,
      "name": "Monitor 4K 27\"",
      "price": 2500
    },
    {
      "id": 5,
      "name": "Headset 7.1 Surround",
      "price": 600
    },
    {
      "id": 6,
      "name": "Webcam Full HD",
      "price": 400
    },
    {
      "id": 7,
      "name": "SSD NVMe 1TB",
      "price": 800
    }
  ]
  ```

---

### 2. Transações Financeiras

#### `GET /api/transactions`

Retorna uma lista de transações financeiras. A lista pode ser filtrada usando parâmetros de consulta.

- **Método:** `GET`
- **Parâmetros de Consulta (Opcionais):**
  - `type`: `'income' | 'expense'`
  - `category`: `string` (Ex: 'Moradia', 'Salário')
  - `startDate`: `string` (Formato ISO, ex: '2024-07-01T00:00:00.000Z')
  - `endDate`: `string` (Formato ISO)
  - `minAmount`: `number`
  - `maxAmount`: `number`
- **Resposta de Sucesso (200 OK):**
  ```json
  [
    {
      "id": "1",
      "date": "2024-07-15T10:00:00Z",
      "description": "Salário de Julho",
      "amount": 5000,
      "type": "income",
      "category": "Salário"
    },
    {
      "id": "2",
      "date": "2024-07-15T12:30:00Z",
      "description": "Aluguel",
      "amount": 1500,
      "type": "expense",
      "category": "Moradia"
    }
  ]
  ```

#### `GET /api/transactions/{id}`

Retorna uma transação específica pelo seu ID.

- **Método:** `GET`
- **Parâmetros da Rota:**
  - `id`: `string` (O ID da transação)
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "id": "1",
    "date": "2024-07-15T10:00:00Z",
    "description": "Salário de Julho",
    "amount": 5000,
    "type": "income",
    "category": "Salário"
  }
  ```
- **Resposta de Erro (404 Not Found):**
  ```json
  {
    "message": "Transação não encontrada."
  }
  ```
  
#### `POST /api/transactions`

Cria uma nova transação financeira.

- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
    "description": "Conta de Internet",
    "amount": 99.90,
    "type": "expense",
    "category": "Contas",
    "date": "2024-07-20T11:00:00.000Z"
  }
  ```
- **Resposta de Sucesso (201 Created):**
  ```json
  {
    "id": "11",
    "description": "Conta de Internet",
    "amount": 99.90,
    "type": "expense",
    "category": "Contas",
    "date": "2024-07-20T11:00:00.000Z"
  }
  ```

---

### 3. Compras

#### `POST /api/checkout`

Processa uma nova compra a partir do carrinho de compras.

- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
    "cart": [
      { "productId": 1, "quantity": 1 },
      { "productId": 2, "quantity": 2 }
    ],
    "total": 8200
  }
  ```
- **Resposta de Sucesso (201 Created):**
  ```json
  {
    "id": "4",
    "date": "2024-07-29T10:00:00.000Z",
    "total": 8200,
    "items": [
        {
          "productId": 1,
          "quantity": 1,
          "name": "Notebook Gamer Pro",
          "price": 7500
        },
        {
          "productId": 2,
          "quantity": 2,
          "name": "Mouse Sem Fio Ultra-leve",
          "price": 350
        }
    ]
  }
  ```
- **Resposta de Erro (400 Bad Request):**
  - Se o total exceder 20.000:
    ```json
    {
      "message": "O valor total da compra excede o limite de R$20.000."
    }
    ```
  - Se os dados forem inválidos:
    ```json
    {
      "message": "Dados da compra inválidos."
    }
    ```

#### `GET /api/purchases`

Retorna o histórico de todas as compras realizadas, ordenadas da mais recente para a mais antiga.

- **Método:** `GET`
- **Resposta de Sucesso (200 OK):**
  ```json
  [
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
        {
          "productId": 2,
          "quantity": 1,
          "name": "Mouse Sem Fio Ultra-leve",
          "price": 350
        }
      ]
    }
  ]
  ```

#### `GET /api/purchases/{id}`

Retorna uma compra específica pelo seu ID.

- **Método:** `GET`
- **Parâmetros da Rota:**
  - `id`: `string` (O ID da compra)
- **Resposta de Sucesso (200 OK):**
  ```json
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
      {
        "productId": 2,
        "quantity": 1,
        "name": "Mouse Sem Fio Ultra-leve",
        "price": 350
      }
    ]
  }
  ```
- **Resposta de Erro (404 Not Found):**
  ```json
  {
    "message": "Compra não encontrada."
  }
  ```
