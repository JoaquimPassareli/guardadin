import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES } from '@/utils/constants';
import { validateTransaction } from '@/utils/validation';
import type { Transaction, TransactionType } from '@/types/Transaction';

interface TransactionFormProps {
  initialData?: Transaction;
  onSubmit: (data: Omit<Transaction, 'id' | 'criadoEm'>) => void;
  onCancel: () => void;
}

export function TransactionForm({ initialData, onSubmit, onCancel }: TransactionFormProps) {
  const [tipo, setTipo] = useState<TransactionType>(initialData?.tipo ?? 'despesa');
  const [descricao, setDescricao] = useState(initialData?.descricao ?? '');
  const [valor, setValor] = useState(initialData?.valor?.toString() ?? '');
  const [categoria, setCategoria] = useState(initialData?.categoria ?? '');
  const [data, setData] = useState(initialData?.data ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      tipo,
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      categoria,
      data,
    };

    if (!validateTransaction(formData)) {
      toast.error('Preencha todos os campos corretamente!');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tipo */}
      <div className="space-y-2">
        <Label>Tipo</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTipo('receita')}
            className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              tipo === 'receita'
                ? 'border-green-500 bg-green-500 text-white'
                : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            💰 Receita
          </button>
          <button
            type="button"
            onClick={() => setTipo('despesa')}
            className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              tipo === 'despesa'
                ? 'border-red-500 bg-red-500 text-white'
                : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            💸 Despesa
          </button>
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Input
          id="descricao"
          placeholder="Ex: Almoço, Salário, Netflix..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      {/* Valor */}
      <div className="space-y-2">
        <Label htmlFor="valor">Valor (R$)</Label>
        <Input
          id="valor"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0,00"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      {/* Categoria */}
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoria</Label>
        <Select value={categoria} onValueChange={setCategoria}>
          <SelectTrigger id="categoria">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.icone} {cat.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Data */}
      <div className="space-y-2">
        <Label htmlFor="data">Data</Label>
        <Input
          id="data"
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      {/* Ações */}
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          type="submit"
          className={`flex-1 ${tipo === 'receita' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {initialData ? 'Salvar alterações' : 'Adicionar transação'}
        </Button>
      </div>
    </form>
  );
}
