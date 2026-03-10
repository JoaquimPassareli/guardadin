import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Transaction } from '../types/Transaction';
import { STORAGE_KEYS } from '../utils/constants';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return stored ? (JSON.parse(stored) as Transaction[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (data: Omit<Transaction, 'id' | 'criadoEm'>) => {
    const newTransaction: Transaction = {
      ...data,
      id: `txn_${Date.now()}`,
      criadoEm: new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    toast.success('Transação adicionada com sucesso! 🎉');
  };

  const updateTransaction = (id: string, data: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
    toast.success('Transação atualizada! ✏️');
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.warning('Transação removida! 🗑️');
  };

  const importTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    toast.success(`${newTransactions.length} transações importadas!`);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    importTransactions,
  };
}
