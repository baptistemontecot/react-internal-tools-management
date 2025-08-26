import React from 'react';

interface KpiCardProps {
  label: string;
  value: React.ReactNode;
  delta?: string;
  deltaColor?: string;
  icon: React.ReactNode;
  iconBg: string;
}

export default function Card({ label, value, delta, deltaColor = 'bg-emerald-500', icon, iconBg }: KpiCardProps) {
  return (
    <div className="relative mt-8 flex h-48 min-w-[240px] flex-col justify-between rounded-xl border bg-white p-4 dark:border-gray-800 dark:bg-black">
      <div className="flex items-start justify-between">
        <span className="text-base text-gray-400">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-lg ${iconBg}`}>{icon}</span>
      </div>
      <div className="mt-4 flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
      {delta && (
        <div>
          <span
            className={`bottom-6 left-6 w-auto rounded-full px-3 py-1 text-xs font-semibold text-white ${deltaColor}`}
          >
            {delta}
          </span>
        </div>
      )}
    </div>
  );
}
