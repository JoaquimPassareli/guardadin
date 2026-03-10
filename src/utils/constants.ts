export const CATEGORIES = [
  { id: 'alimentacao', nome: 'Alimentação', icone: '🍔', cor: '#FF6384' },
  { id: 'transporte', nome: 'Transporte', icone: '🚗', cor: '#36A2EB' },
  { id: 'lazer', nome: 'Lazer', icone: '🎮', cor: '#FFCE56' },
  { id: 'moradia', nome: 'Moradia', icone: '🏠', cor: '#4BC0C0' },
  { id: 'saude', nome: 'Saúde', icone: '💊', cor: '#9966FF' },
  { id: 'educacao', nome: 'Educação', icone: '📚', cor: '#FF9F40' },
  { id: 'salario', nome: 'Salário', icone: '💰', cor: '#4CAF50' },
  { id: 'outros', nome: 'Outros', icone: '📦', cor: '#607D8B' },
];

export const STORAGE_KEYS = {
  TRANSACTIONS: 'guardadin_transactions',
  THEME: 'guardadin-theme',
} as const;
