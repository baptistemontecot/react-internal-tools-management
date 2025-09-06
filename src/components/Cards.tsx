import Card from './common/Card.tsx';
import ErrorMessage from './common/ErrorMessage.tsx';
import CardSkeleton from './skeleton/CardSkeleton.tsx';
import { useDashboard } from '../context/DashboardProvider.tsx';
import { Building2, TrendingUp, Users, Wrench } from 'lucide-react';
import { safeRound, getSafeNumber } from '../utils/safeCalculations';

export default function Cards() {
  const { error, loading, tools, analytics, departments } = useDashboard();
  const totalDepartments = departments ? departments.length : 0;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {error ? (
          <>
            <ErrorMessage message="Impossible de charger les KPIs. Vérifiez votre connexion." />
          </>
        ) : loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <Card
              label="Monthly Budget"
              value={`€${getSafeNumber(analytics?.budget_overview.current_month_total).toLocaleString()}/€${safeRound(analytics && analytics?.budget_overview.monthly_limit / 1000)}k`}
              delta={analytics && analytics.kpi_trends.budget_change}
              color="emerald"
              icon={<TrendingUp size={20} />}
            />
            <Card
              label="Active ToolsTable"
              value={tools && tools.length}
              delta={analytics && analytics.kpi_trends.tools_change}
              color="purple"
              icon={<Wrench size={20} />}
            />
            <Card
              label="Departments"
              value={totalDepartments}
              delta={analytics && analytics.kpi_trends.departments_change}
              color="red"
              icon={<Building2 size={20} />}
            />
            <Card
              label="Cost/User"
              value={`€${getSafeNumber(analytics?.cost_analytics.cost_per_user)}`}
              delta={analytics && analytics.kpi_trends.cost_per_user_change}
              color="pink"
              icon={<Users size={20} />}
            />
          </>
        )}
      </div>
    </>
  );
}
