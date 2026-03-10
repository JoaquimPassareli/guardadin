import type { Transaction } from '../types/Transaction';

interface DollarRateResponse {
  USDBRL: {
    bid: string;
    ask: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    timestamp: string;
  };
}

export async function fetchDollarRate(): Promise<number> {
  const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
  if (!response.ok) {
    throw new Error('Falha ao buscar cotação do dólar');
  }
  const data = (await response.json()) as DollarRateResponse;
  return parseFloat(data.USDBRL.bid);
}

export function exportTransactions(transactions: Transaction[]): void {
  const json = JSON.stringify(transactions, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `guardadin_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importTransactions(
  file: File,
  onSuccess: (transactions: Transaction[]) => void,
  onError: (error: string) => void
): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const parsed = JSON.parse(content) as Transaction[];
      if (!Array.isArray(parsed)) {
        onError('Arquivo inválido: deve conter um array de transações');
        return;
      }
      onSuccess(parsed);
    } catch {
      onError('Erro ao ler o arquivo JSON');
    }
  };
  reader.readAsText(file);
}
