'use client';

import Navbar from '../components/Navbar.tsx';
import { useTools } from '../hooks/useTools.ts';
import ToolIcon from '../components/ToolIcon.tsx';
import Card from '../components/Card.tsx';
import { Building2, TrendingUp, Users, Wrench } from 'lucide-react';

export default function Dashboard() {
  const { tools, loading, error } = useTools();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <>
      <Navbar />
      return (
      <div className="mx-auto flex max-w-7xl flex-col px-2 sm:px-6">
        <div className="mt-8">
          <h1 className="text-3xl font-semibold text-white">Internal Tools Dashboard</h1>
          <p className="mt-4 text-base text-gray-400">
            Monitor and manage your organization's software tools and expenses
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <Card
            label="Monthly Budget"
            value="€28,750"
            delta="+12%"
            deltaColor="bg-emerald-500"
            icon={<TrendingUp className="text-white" size={20} />}
            iconBg="bg-emerald-500"
          />
          <Card
            label="Active Tools"
            value={147}
            delta="+8"
            deltaColor="bg-violet-600"
            icon={<Wrench className="text-white" size={20} />}
            iconBg="bg-violet-600"
          />
          <Card
            label="Departments"
            value={8}
            delta="+2"
            deltaColor="bg-rose-500"
            icon={<Building2 className="text-white" size={20} />}
            iconBg="bg-rose-500"
          />
          <Card
            label="Cost/User"
            value="€156"
            delta="-€12"
            deltaColor="bg-fuchsia-600"
            icon={<Users className="text-white" size={20} />}
            iconBg="bg-fuchsia-600"
          />
        </div>
        <div className="mt-8 w-full overflow-x-auto rounded-md border p-8 dark:border-gray-800">
          <h2 className="mb-4 text-white">Recent Tools</h2>
          <div className="min-w-max overflow-hidden">
            <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-100 p-4 text-sm text-gray-900 dark:border-gray-800 dark:bg-black dark:text-gray-400">
              <div>Tool</div>
              <div>Department</div>
              <div>Users</div>
              <div>Monthly Cost</div>
              <div>Status</div>
            </div>
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="grid grid-cols-5 border-b border-gray-200 px-2 py-5 text-sm text-gray-700 dark:border-gray-800"
              >
                <ToolIcon iconUrl={tool.icon_url} name={tool.name} alt={tool.name} className="h-6 w-6 rounded" />
                <div>{tool.owner_department}</div>
                <div>{tool.active_users_count}</div>
                <div>{tool.monthly_cost} €</div>
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                      tool.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : tool.status === 'expiring'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {tool.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
