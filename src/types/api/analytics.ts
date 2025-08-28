type BudgetOverview = {
  monthly_limit: number;
  current_month_total: number;
  previous_month_total: number;
  budget_utilization: string;
  trend_percentage: string;
};

type KpiTrends = {
  budget_change: string;
  tools_change: string;
  departments_change: string;
  cost_per_user_change: string;
};

type CostAnalytics = {
  cost_per_user: number;
  previous_cost_per_user: number;
  active_users: number;
  total_users: string;
};

export type AnalyticsResponse = {
  budget_overview: BudgetOverview;
  kpi_trends: KpiTrends;
  cost_analytics: CostAnalytics;
};
