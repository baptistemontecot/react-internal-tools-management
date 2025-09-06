import type { Tool } from '../../types';
import Status from '../common/badges/Status.tsx';
import { Calendar, ExternalLink, Pen, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate, calculateDelta } from '../../utils/formatters';
import ToolIcon from '../common/ToolIcon.tsx';

interface ToolCardProps {
  tool: Tool;
  onEdit?: (tool: Tool) => void;
  onDelete?: (tool: Tool) => void;
}

export default function ToolCard({ tool, onEdit, onDelete }: ToolCardProps) {
  const costDelta = calculateDelta(tool.monthly_cost, tool.previous_month_cost);
  const deltaColor = costDelta >= 0 ? 'red' : 'emerald';

  return (
    <div className="group relative flex h-72 min-w-[280px] flex-col justify-between rounded-xl bg-white p-6 shadow-md inset-shadow-2xs transition-all duration-200 hover:scale-105 hover:shadow-lg dark:border dark:border-gray-800 dark:bg-black">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg`}>
            <ToolIcon iconUrl={tool.icon_url} alt={`${tool.name} icon`} className="h-7 w-7 rounded" />
          </div>
          <div className="relative min-w-0 flex-1">
            <h3 className="overflow-hidden-x truncate text-lg font-semibold text-gray-900 dark:text-white">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tool.vendor}</p>
          </div>
        </div>

        <div className="flex space-x-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {onEdit && (
            <button
              onClick={() => onEdit(tool)}
              className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-emerald-50 hover:text-emerald-500"
              title="Edit"
            >
              <Pen size={16} />
            </button>
          )}
          {tool.website_url && (
            <a
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="top-4 right-4 rounded-lg p-1.5 text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-blue-50 hover:text-blue-500"
            >
              <ExternalLink size={14} />
            </a>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(tool)}
              className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-emerald-50 hover:text-emerald-500"
              title="Edit"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      <p className="mb-4 line-clamp-2 overflow-y-auto text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Status status={tool.status} />
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            {tool.category}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">{tool.active_users_count} users</span>
          <span className="text-gray-500 dark:text-gray-400">{tool.owner_department}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(tool.monthly_cost)}</span>
            <span className="text-xs text-gray-500">/mois</span>
          </div>

          {costDelta !== 0 && (
            <span
              className={`inline-flex items-center rounded-full bg-gradient-to-r px-2 py-1 text-xs font-medium from-${deltaColor}-400 to-${deltaColor}-600 text-white shadow-sm`}
            >
              {costDelta > 0 ? '+' : ''}
              {costDelta}%
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <Calendar size={12} />
          <span>Mis à jour {formatDate(tool.updated_at)}</span>
        </div>
      </div>
    </div>
  );
}
