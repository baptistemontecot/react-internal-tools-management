import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Tool } from '../../types';

interface EditToolModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTool: Tool) => void;
}

export default function EditToolModal({ tool, isOpen, onClose, onSave }: EditToolModalProps) {
  const [formData, setFormData] = useState<Partial<Tool>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (tool) {
      setFormData({
        name: tool.name,
        description: tool.description,
        vendor: tool.vendor,
        category: tool.category,
        monthly_cost: tool.monthly_cost,
        owner_department: tool.owner_department,
        status: tool.status,
        website_url: tool.website_url,
      });
    }
  }, [tool]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Le nom est obligatoire';
    }
    if (!formData.vendor?.trim()) {
      newErrors.vendor = 'Le vendor est obligatoire';
    }
    if (!formData.monthly_cost || formData.monthly_cost <= 0) {
      newErrors.monthly_cost = 'Le coût mensuel doit être supérieur à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tool || !validateForm()) return;

    const updatedTool: Tool = {
      ...tool,
      ...formData,
      updated_at: new Date().toISOString(),
    } as Tool;

    onSave(updatedTool);
    onClose();
  };

  const handleChange = (field: keyof Tool, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative m-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Modifier {tool.name}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 transition-colors hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Nom *</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Vendor *</label>
            <input
              type="text"
              value={formData.vendor || ''}
              onChange={(e) => handleChange('vendor', e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                errors.vendor ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
            />
            {errors.vendor && <p className="mt-1 text-sm text-red-500">{errors.vendor}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie</label>
              <select
                value={formData.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Communication">Communication</option>
                <option value="Productivity">Productivity</option>
                <option value="Analytics">Analytics</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Coût mensuel ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.monthly_cost || ''}
                onChange={(e) => handleChange('monthly_cost', parseFloat(e.target.value))}
                className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                  errors.monthly_cost ? 'border-red-500' : 'border-gray-300'
                } dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
              />
              {errors.monthly_cost && <p className="mt-1 text-sm text-red-500">{errors.monthly_cost}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Département</label>
              <select
                value={formData.owner_department || ''}
                onChange={(e) => handleChange('owner_department', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Statut</label>
              <select
                value={formData.status || ''}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="unused">Unused</option>
                <option value="expiring">Expiring</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">URL du site web</label>
            <input
              type="url"
              value={formData.website_url || ''}
              onChange={(e) => handleChange('website_url', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="https://www.alt.bzh/"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-transition-colors cursor-pointer rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-600 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex cursor-pointer items-center space-x-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-white hover:text-purple-600"
            >
              <Save size={16} />
              <span>Sauvegarder</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
