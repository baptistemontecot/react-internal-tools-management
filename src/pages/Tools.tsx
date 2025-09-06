import Navbar from '../components/Navbar.tsx';
import { useDashboard } from '../context/DashboardProvider.tsx';
import ToolsContainer from '../components/Tool/ToolsContainer.tsx';

export default function Tools() {
  const { loading, tools } = useDashboard();

  return (
    <>
      <Navbar />
      <div className="mx-auto flex max-w-7xl flex-col bg-white px-2 sm:px-6 dark:bg-black">
        <div className="mt-8">
          <h1 className="text-3xl font-semibold dark:text-white">Internal Tools Catalog</h1>
          <p className="mt-4 text-base text-gray-400">
            Monitor and manage your organization's software tools and expenses
          </p>
        </div>
        {tools && <ToolsContainer tools={tools} loading={loading} />}
      </div>
    </>
  );
}
