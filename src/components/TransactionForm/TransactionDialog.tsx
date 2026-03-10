import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TransactionForm } from './TransactionForm';
import type { Transaction } from '@/types/Transaction';

interface TransactionDialogProps {
  onAdd: (data: Omit<Transaction, 'id' | 'criadoEm'>) => void;
  onUpdate?: (id: string, data: Partial<Transaction>) => void;
  editTransaction?: Transaction | null;
  onEditClose?: () => void;
}

export function TransactionDialog({
  onAdd,
  onUpdate,
  editTransaction,
  onEditClose,
}: TransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const isEditMode = Boolean(editTransaction);
  const isOpen = isEditMode ? true : open;

  const handleOpenChange = (value: boolean) => {
    if (isEditMode) {
      if (!value) onEditClose?.();
    } else {
      setOpen(value);
    }
  };

  const handleSubmit = (data: Omit<Transaction, 'id' | 'criadoEm'>) => {
    if (isEditMode && editTransaction && onUpdate) {
      onUpdate(editTransaction.id, data);
      onEditClose?.();
    } else {
      onAdd(data);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      onEditClose?.();
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            Nova Transação
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? '✏️ Editar Transação' : '➕ Nova Transação'}
          </DialogTitle>
        </DialogHeader>
        <TransactionForm
          initialData={editTransaction ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
