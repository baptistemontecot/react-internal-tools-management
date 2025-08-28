import React from 'react';

interface KpiCardProps {
  label: string;
  value: number | string | null;
  delta: string | null;
  color: string;
  icon: React.ReactNode;
}

export default function Card({ label, value, delta, color, icon }: KpiCardProps) {
  return (
    <div className="relative mt-8 flex h-48 min-w-[240px] flex-col justify-between rounded-xl bg-white p-4 shadow-md inset-shadow-2xs dark:border dark:border-gray-800 dark:bg-black">
      <div className="flex items-start justify-between">
        <span className="text-base text-gray-400">{label}</span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r text-white shadow-lg from-${color}-400 to-${color}-600 dark:text-white`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-4 flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-black dark:text-white">{value}</span>
      </div>
      {delta && (
        <div>
          <span
            className={`bottom-6 left-6 w-auto rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white shadow-lg from-${color}-400 to-${color}-600`}
          >
            {delta}
          </span>
        </div>
      )}
    </div>
  );
}
