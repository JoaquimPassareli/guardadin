import type { Transaction } from '../types/Transaction';

export function validateTransaction(
  data: Partial<Omit<Transaction, 'id' | 'criadoEm'>>
): boolean {
  if (!data.tipo || !['receita', 'despesa'].includes(data.tipo)) return false;
  if (!data.descricao || data.descricao.trim().length === 0) return false;
  if (data.valor === undefined || data.valor === null || isNaN(data.valor) || data.valor <= 0)
    return false;
  if (!data.categoria || data.categoria.trim().length === 0) return false;
  if (!data.data || data.data.trim().length === 0) return false;
  return true;
}
