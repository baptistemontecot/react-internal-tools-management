import type { ToolStatus } from '../../../types';

interface StatusProps {
  status: ToolStatus;
}

export default function Status({ status }: StatusProps) {
  const getStatusConfig = (status: ToolStatus) => {
    const configs = {
      active: {
        colors: 'from-emerald-400 to-emerald-600',
        label: 'Active',
      },
      unused: {
        colors: 'from-red-400 to-red-600',
        label: 'Unused',
      },
      expiring: {
        colors: 'from-orange-400 to-orange-600',
        label: 'Expiring',
      },
    } as const;

    const defaultConfig = {
      colors: 'from-gray-400 to-gray-600',
      label: 'Non configuré',
    };

    return status in configs ? configs[status as keyof typeof configs] : defaultConfig;
  };

  const { colors, label } = getStatusConfig(status);

  return (
    <div
      className={`inline-flex items-center rounded-full bg-gradient-to-r font-semibold text-white shadow-sm ${colors}`}
    >
      <span className="flex-shrink-0 rounded-full px-2 py-1 text-xs capitalize">{label}</span>
    </div>
  );
}
