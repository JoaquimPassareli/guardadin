import { TransactionCard } from '@/components/TransactionCard/TransactionCard';
import type { Transaction } from '@/types/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <div className="mb-4 text-5xl">🐷</div>
        <p className="text-lg font-medium">Nenhuma transação encontrada</p>
        <p className="mt-1 text-sm">
          Adicione sua primeira transação clicando em "Nova Transação"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
