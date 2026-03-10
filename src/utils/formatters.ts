export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR');
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    alimentacao: '🍔',
    transporte: '🚗',
    lazer: '🎮',
    moradia: '🏠',
    saude: '💊',
    educacao: '📚',
    salario: '💰',
    outros: '📦',
  };
  return icons[category] || '📦';
}

export function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    alimentacao: 'Alimentação',
    transporte: 'Transporte',
    lazer: 'Lazer',
    moradia: 'Moradia',
    saude: 'Saúde',
    educacao: 'Educação',
    salario: 'Salário',
    outros: 'Outros',
  };
  return names[category] || category;
}
