import { useRef } from 'react';
import { Download, Upload, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { TransactionDialog } from '@/components/TransactionForm/TransactionDialog';
import { exportTransactions, importTransactions, fetchDollarRate } from '@/services/apiService';
import type { Transaction } from '@/types/Transaction';

interface NavbarProps {
  transactions: Transaction[];
  onAdd: (data: Omit<Transaction, 'id' | 'criadoEm'>) => void;
  onImport: (transactions: Transaction[]) => void;
}

export function Navbar({ transactions, onAdd, onImport }: NavbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportTransactions(transactions);
    toast.success('Transações exportadas com sucesso!');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importTransactions(
      file,
      (imported) => onImport(imported),
      (err) => toast.error(err)
    );
    e.target.value = '';
  };

  const handleFetchDollar = async () => {
    try {
      const rate = await fetchDollarRate();
      toast.info(`💵 Dólar hoje: R$ ${rate.toFixed(2)}`);
    } catch {
      toast.error('Não foi possível buscar a cotação do dólar');
    }
  };

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐷</span>
          <h1 className="text-xl font-bold tracking-tight">GuardaDin</h1>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFetchDollar}
                >
                  <DollarSign className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Cotação do Dólar</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleExport}
                  disabled={transactions.length === 0}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Exportar Transações</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleImportClick}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Importar Transações</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeToggle />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Alternar Tema</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileChange}
          />

          <TransactionDialog onAdd={onAdd} />
        </div>
      </div>
    </header>
  );
}
