import { X, Trash2 } from 'lucide-react';
import type { Tool } from '../../types';

interface DeleteConfirmationModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tool: Tool) => void;
  isDeleting?: boolean;
}

export default function DeleteConfirmationModal({
  tool,
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative m-4 w-full max-w-md rounded-xl bg-white p-6 dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/20">
              <Trash2 size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Supprimer l'outil</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Êtes-vous sûr de vouloir supprimer <strong>{tool.name}</strong> ?
          </p>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/10">
            <p className="text-sm text-red-800 dark:text-red-200">
              ⚠️ Cette action est irréversible. L'outil sera définitivement supprimé.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={() => onConfirm(tool)}
            disabled={isDeleting}
            className="flex items-center space-x-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 size={16} />
            <span>{isDeleting ? 'Suppression...' : 'Supprimer'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
