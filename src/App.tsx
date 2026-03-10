import { useState } from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { TransactionList } from '@/components/TransactionList/TransactionList';
import { TransactionDialog } from '@/components/TransactionForm/TransactionDialog';
import { Filters } from '@/components/Filters/Filters';
import { Toaster } from '@/components/ui/sonner';
import { useTransactions } from '@/hooks/useTransactions';
import { useFilters } from '@/hooks/useFilters';
import type { Transaction } from '@/types/Transaction';

function App() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction, importTransactions } =
    useTransactions();
  const { filters, filteredTransactions, updateFilter, resetFilters } = useFilters(transactions);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        transactions={transactions}
        onAdd={addTransaction}
        onImport={importTransactions}
      />

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="space-y-6">
          <Dashboard transactions={transactions} />

          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Filtros
            </h2>
            <Filters
              filters={filters}
              onUpdateFilter={updateFilter}
              onReset={resetFilters}
            />
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Transações
                {filteredTransactions.length !== transactions.length && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({filteredTransactions.length} de {transactions.length})
                  </span>
                )}
              </h2>
            </div>
            <TransactionList
              transactions={filteredTransactions}
              onEdit={setEditTransaction}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </main>

      {editTransaction && (
        <TransactionDialog
          onAdd={addTransaction}
          onUpdate={updateTransaction}
          editTransaction={editTransaction}
          onEditClose={() => setEditTransaction(null)}
        />
      )}

      <Toaster richColors />
    </div>
  );
}

export default App;
