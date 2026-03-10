export type TransactionType = 'receita' | 'despesa';

export interface Transaction {
  id: string;
  tipo: TransactionType;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
  criadoEm: string;
}

export interface Category {
  id: string;
  nome: string;
  cor: string;
  icone: string;
}

export interface Filters {
  tipo: TransactionType | 'todos';
  categoria: string;
  dataInicio: string;
  dataFim: string;
  busca: string;
}

export interface DashboardData {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  transacoesPorCategoria: Record<string, number>;
}
