import ToolList from './ToolList.tsx';
import { useDashboard } from '../../context/DashboardProvider.tsx';

export default function ToolsTable() {
  const { tools } = useDashboard();

  return (
    <div className="my-8 w-full overflow-x-auto rounded-xl p-8 shadow-md inset-shadow-2xs dark:border dark:border-gray-800">
      <div className="relative mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-white">Recent Tools</h2>
      </div>
      {tools && <ToolList tools={tools} />}
    </div>
  );
}
