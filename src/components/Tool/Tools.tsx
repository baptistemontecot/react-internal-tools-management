import ToolList from './ToolList.tsx';
import ToolFilter from './ToolFilter.tsx';
import { useDashboard } from '../../context/DashboardProvider.tsx';

export default function Tools() {
  const { tools } = useDashboard();

  return (
    <div className="my-8 w-full overflow-x-auto rounded-xl p-8 shadow-md inset-shadow-2xs dark:border dark:border-gray-800">
      <ToolFilter />
      <ToolList tools={tools} />
    </div>
  );
}
