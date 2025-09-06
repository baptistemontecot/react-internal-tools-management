import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { Tool } from '../../types';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTool: Partial<Tool>) => void;
  isSaving?: boolean;
}

export default function AddToolModal({ isOpen, onClose, onSave, isSaving = false }: AddToolModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vendor: '',
    category: 'Design',
    monthly_cost: '',
    previous_month_cost: '',
    owner_department: 'Operations',
    status: 'active',
    website_url: '',
    icon_url: '',
    active_users_count: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.vendor) {
      alert('Le nom et le vendor sont obligatoires');
      return;
    }

    const toolData = {
      ...formData,
      monthly_cost: parseFloat(formData.monthly_cost) || 0,
      previous_month_cost: parseFloat(formData.previous_month_cost) || 0,
      active_users_count: parseInt(formData.active_users_count) || 0,
    };

    onSave(toolData);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      vendor: '',
      category: 'Design',
      monthly_cost: '',
      previous_month_cost: '',
      owner_department: 'Operations',
      status: 'active',
      website_url: '',
      icon_url: '',
      active_users_count: '',
    });
  };

  const handleClose = () => {
    if (isSaving) return;
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative m-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/20">
              <Plus size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Ajouter un nouvel outil</h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isSaving}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Nom *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Ex: Figma"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Vendor *</label>
              <input
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Ex: Figma Inc"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Communication">Communication</option>
                <option value="Productivity">Productivity</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Département</label>
              <select
                name="owner_department"
                value={formData.owner_department}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="Operations">Operations</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Coût mensuel ($)
              </label>
              <input
                type="number"
                name="monthly_cost"
                value={formData.monthly_cost}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="476.00"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Utilisateurs actifs
              </label>
              <input
                type="number"
                name="active_users_count"
                value={formData.active_users_count}
                onChange={handleChange}
                min="0"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="34"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">URL du site</label>
              <input
                type="url"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="https://figma.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">URL de l'icône</label>
              <input
                type="url"
                name="icon_url"
                value={formData.icon_url}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="https://static.figma.com/app/icon/1/favicon.png"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Collaborative design and prototyping tool"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving}
              className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              <Plus size={16} />
              <span>{isSaving ? 'Création...' : "Créer l'outil"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
