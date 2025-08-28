import type { Tool } from '../../types';
import ToolIcon from './../common/ToolIcon.tsx';

export default function ToolRow({ tool }: { tool: Tool }) {
  return (
    <div
      key={tool.id}
      className="grid grid-cols-[400px_1fr_1fr_1fr_1fr] border-b border-gray-200 px-2 py-5 text-sm dark:border-gray-800 dark:text-gray-400"
    >
      <ToolIcon iconUrl={tool.icon_url} name={tool.name} alt={tool.name} className="h-6 w-6 rounded" />
      <div>{tool.category}</div>
      <div>{tool.active_users_count}</div>
      <div>{tool.monthly_cost} €</div>
      <div>
        <span
          className={`inline-block rounded-md px-2 py-1 text-xs font-semibold capitalize ${
            tool.status === 'active'
              ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
              : tool.status === 'expiring'
                ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
                : 'bg-gradient-to-r from-red-400 to-red-600 text-white'
          }`}
        >
          {tool.status}
        </span>
      </div>
    </div>
  );
}
