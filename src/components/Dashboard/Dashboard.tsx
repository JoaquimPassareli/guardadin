import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';
import type { Transaction } from '@/types/Transaction';

interface DashboardProps {
  transactions: Transaction[];
}

export function Dashboard({ transactions }: DashboardProps) {
  const { totalReceitas, totalDespesas, saldo } = useMemo(() => {
    const totalReceitas = transactions
      .filter((t) => t.tipo === 'receita')
      .reduce((sum, t) => sum + t.valor, 0);
    const totalDespesas = transactions
      .filter((t) => t.tipo === 'despesa')
      .reduce((sum, t) => sum + t.valor, 0);
    return { totalReceitas, totalDespesas, saldo: totalReceitas - totalDespesas };
  }, [transactions]);

  const receitasCount = transactions.filter((t) => t.tipo === 'receita').length;
  const despesasCount = transactions.filter((t) => t.tipo === 'despesa').length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Receitas
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            R$ {formatCurrency(totalReceitas)}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {receitasCount} {receitasCount === 1 ? 'registro' : 'registros'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Despesas
          </CardTitle>
          <TrendingDown className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            R$ {formatCurrency(totalDespesas)}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {despesasCount} {despesasCount === 1 ? 'registro' : 'registros'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card
        className={`border-l-4 ${saldo >= 0 ? 'border-l-blue-500' : 'border-l-orange-500'} sm:col-span-2 lg:col-span-1`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Saldo</CardTitle>
          <Wallet
            className={`h-5 w-5 ${saldo >= 0 ? 'text-blue-500' : 'text-orange-500'}`}
          />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              saldo >= 0
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-orange-600 dark:text-orange-400'
            }`}
          >
            {saldo < 0 && <span>- </span>}R$ {formatCurrency(Math.abs(saldo))}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {transactions.length} {transactions.length === 1 ? 'transação' : 'transações'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
