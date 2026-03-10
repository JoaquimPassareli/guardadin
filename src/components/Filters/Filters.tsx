import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES } from '@/utils/constants';
import type { Filters as FiltersType } from '@/types/Transaction';

interface FiltersProps {
  filters: FiltersType;
  onUpdateFilter: <K extends keyof FiltersType>(key: K, value: FiltersType[K]) => void;
  onReset: () => void;
}

export function Filters({ filters, onUpdateFilter, onReset }: FiltersProps) {
  const hasActiveFilters =
    filters.tipo !== 'todos' ||
    filters.categoria !== 'todas' ||
    filters.dataInicio !== '' ||
    filters.dataFim !== '' ||
    filters.busca !== '';

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por descrição..."
          value={filters.busca}
          onChange={(e) => onUpdateFilter('busca', e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          value={filters.tipo}
          onValueChange={(v) =>
            onUpdateFilter('tipo', v as FiltersType['tipo'])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os tipos</SelectItem>
            <SelectItem value="receita">💰 Receita</SelectItem>
            <SelectItem value="despesa">💸 Despesa</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.categoria}
          onValueChange={(v) => onUpdateFilter('categoria', v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as categorias</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.icone} {cat.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-1">
          <Input
            type="date"
            placeholder="Data início"
            value={filters.dataInicio}
            onChange={(e) => onUpdateFilter('dataInicio', e.target.value)}
            title="Data início"
          />
        </div>

        <div className="space-y-1">
          <Input
            type="date"
            placeholder="Data fim"
            value={filters.dataFim}
            onChange={(e) => onUpdateFilter('dataFim', e.target.value)}
            title="Data fim"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-1 text-muted-foreground">
            <X className="h-3.5 w-3.5" />
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
