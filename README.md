# 🐷 GuardaDin

> Aplicação web para gestão de finanças pessoais. Registre receitas, despesas, categorize seus gastos e acompanhe seu saldo em tempo real.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Funcionalidades

- 📊 **Dashboard** — Cards com resumo de receitas, despesas e saldo
- ➕ **CRUD completo** — Adicionar, editar e excluir transações com confirmação
- 🔍 **Filtros avançados** — Por tipo, categoria, data e busca por texto
- 🌙 **Tema claro/escuro** — Com persistência no localStorage
- 🔔 **Notificações toast** — Feedback para todas as ações
- 📤 **Exportar JSON** — Backup das transações
- 📥 **Importar JSON** — Restaurar transações de backup
- 💵 **Cotação do dólar** — Busca em tempo real via API
- 💾 **100% offline** — Dados persistidos no localStorage

## 🛠️ Stack Tecnológica

| Tecnologia | Função |
|---|---|
| React 19 | Interface de usuário |
| TypeScript 5 | Tipagem estática |
| Vite 7 | Build tool com HMR |
| Tailwind CSS 4 | Estilização utilitária |
| shadcn/ui | Componentes UI acessíveis (Radix UI) |
| Lucide React | Ícones SVG |
| Sonner | Toast notifications |

## 🚀 Como executar

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/JoaquimPassareli/guardadin.git
cd guardadin

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com HMR
npm run build    # Build de produção
npm run preview  # Preview do build de produção
npm run lint     # Verificação de lint
```

## 📁 Estrutura do Projeto

```
guardadin/
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes shadcn/ui
│   │   ├── Dashboard/             # Cards de resumo financeiro
│   │   ├── TransactionList/       # Lista de transações
│   │   ├── TransactionForm/       # Formulário e Dialog de transação
│   │   ├── TransactionCard/       # Card individual de transação
│   │   ├── Filters/               # Painel de filtros
│   │   ├── Navbar/                # Barra de navegação
│   │   ├── ThemeToggle/           # Botão de alternância de tema
│   │   └── theme-provider.tsx     # Context do tema
│   ├── hooks/
│   │   ├── useLocalStorage.ts     # Hook genérico de localStorage
│   │   ├── useTransactions.ts     # Gerenciamento de transações
│   │   └── useFilters.ts          # Lógica de filtragem
│   ├── types/
│   │   └── Transaction.ts         # Tipagens TypeScript
│   ├── services/
│   │   ├── storageService.ts      # Operações no localStorage
│   │   └── apiService.ts          # Chamadas externas (cotação, export/import)
│   ├── utils/
│   │   ├── validation.ts          # Validação de formulários
│   │   ├── formatters.ts          # Formatação de moeda, data, categorias
│   │   └── constants.ts           # Categorias e chaves de storage
│   ├── lib/
│   │   └── utils.ts               # Utilitário cn() do shadcn
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                  # Tailwind + variáveis CSS shadcn
├── components.json                # Configuração do shadcn/ui
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## �� Categorias disponíveis

| Ícone | Nome |
|---|---|
| 🍔 | Alimentação |
| 🚗 | Transporte |
| 🎮 | Lazer |
| 🏠 | Moradia |
| 💊 | Saúde |
| 📚 | Educação |
| 💰 | Salário |
| 📦 | Outros |

## 📄 Licença

Este projeto está sob a licença MIT.

---

Feito com ❤️ e 🐷 por [Joaquim Passareli](https://github.com/JoaquimPassareli)
