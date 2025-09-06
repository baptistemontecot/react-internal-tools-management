import { useState } from 'react';
import api from '../../utils/api.ts';
import ToolCard from './ToolCard.tsx';
import type { Tool } from '../../types';
import ToolFilter from './ToolFilter.tsx';
import ToolsTable from './ToolsTable.tsx';
import { Grid3X3, List, Plus } from 'lucide-react';
import { EmptyState } from './EmptyState.tsx';
import { ToolsSkeleton } from '../skeleton/ToolsSkeleton.tsx';
import { useToolsFilterStore } from '../../stores/useToolsFilterStore.tsx';
import EditToolModal from '../modals/EditToolModal.tsx';
import { useToolsStore } from '../../stores/useToolsStore.tsx';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal.tsx';
import AddToolModal from '../modals/AddToolModal.tsx';

interface ToolsContainerProps {
  tools: Tool[];
  loading?: boolean;
}

type ViewMode = 'grid' | 'table';

export default function ToolsContainer({ tools, loading }: ToolsContainerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTools = useToolsFilterStore(tools);
  const { updateTool, deleteTool, addTool } = useToolsStore();

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setIsModalOpen(true);
  };

  const [deletingTool, setDeletingTool] = useState<Tool | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTool(null);
  };

  const handleSaveTool = async (updatedTool: Tool) => {
    try {
      const response = await api.put(`/tools/${updatedTool.id}`, updatedTool);

      if (response.status === 200) {
        const currentTool = tools.find((t) => t.id === updatedTool.id);
        const mergedTool = { ...currentTool, ...response.data };

        updateTool(mergedTool);

        setIsModalOpen(false);
        setEditingTool(null);

        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDeleteTool = (tool: Tool) => {
    setDeletingTool(tool);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setDeletingTool(null);
  };

  const handleConfirmDelete = async (tool: Tool) => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/tools/${tool.id}`);
      if (response.status === 200) {
        deleteTool(tool.id);

        setIsDeleteModalOpen(false);
        setDeletingTool(null);

        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    if (isSaving) return;
    setIsAddModalOpen(false);
  };

  const handleCreateTool = async (newToolData: Partial<Tool>) => {
    setIsSaving(true);
    try {
      const response = await api.post('/tools', newToolData);
      if (response.status === 201) {
        addTool(response.data);
        setIsAddModalOpen(false);

        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert("❌ Erreur lors de la création de l'outil");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <ToolsSkeleton viewMode={viewMode} />;
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Outils ({filteredTools ? filteredTools.length : '00'})
          </h2>

          <div className="flex items-center rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-md p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`rounded-md p-2 transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <List size={16} />
            </button>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="flex cursor-pointer items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            <Plus size={16} />
            <span>Ajouter un outil</span>
          </button>
        </div>
      </div>

      <ToolFilter tools={tools} />

      {filteredTools.length === 0 ? (
        <EmptyState />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onEdit={handleEditTool} onDelete={handleDeleteTool} />
          ))}
        </div>
      ) : (
        <ToolsTable tools={filteredTools} onEdit={handleEditTool} onDelete={handleDeleteTool} />
      )}

      <EditToolModal tool={editingTool} isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveTool} />
      <DeleteConfirmationModal
        tool={deletingTool}
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
      <AddToolModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleCreateTool}
        isSaving={isSaving}
      />
    </div>
  );
}
