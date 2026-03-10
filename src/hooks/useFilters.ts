import { useState, useMemo } from 'react';
import type { Transaction, Filters } from '../types/Transaction';

const DEFAULT_FILTERS: Filters = {
  tipo: 'todos',
  categoria: 'todas',
  dataInicio: '',
  dataFim: '',
  busca: '',
};

export function useFilters(transactions: Transaction[]) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filters.tipo !== 'todos' && t.tipo !== filters.tipo) return false;
      if (filters.categoria !== 'todas' && t.categoria !== filters.categoria) return false;
      if (filters.dataInicio && t.data < filters.dataInicio) return false;
      if (filters.dataFim && t.data > filters.dataFim) return false;
      if (
        filters.busca &&
        !t.descricao.toLowerCase().includes(filters.busca.toLowerCase())
      )
        return false;
      return true;
    });
  }, [transactions, filters]);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return { filters, filteredTransactions, updateFilter, resetFilters };
}
