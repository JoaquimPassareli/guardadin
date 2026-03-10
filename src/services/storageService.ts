import type { Transaction } from '../types/Transaction';
import { STORAGE_KEYS } from '../utils/constants';

export function getTransactions(): Transaction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return stored ? (JSON.parse(stored) as Transaction[]) : [];
  } catch {
    return [];
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
}
