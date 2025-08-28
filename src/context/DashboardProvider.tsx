import useTools from '../hooks/useTools';
import useAnalytics from './../hooks/useAnalytics.ts';
import { useDepartments } from '../hooks/useDepartment.ts';
import { createContext, type ReactNode, useContext } from 'react';
import type { Tools, AnalyticsResponse, Departments } from '../types';

interface DashboardProviderProps {
  children: ReactNode;
}

interface DashboardContextType {
  tools: Tools | null;
  analytics: AnalyticsResponse | null;
  departments: Departments | null;
  loading: boolean;
  error: string | Error | null;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: DashboardProviderProps) {
  const { analytics, loading: loadingAnalytics, error: errorAnalytics } = useAnalytics();
  const { tools, loading: loadingTools, error: errorTools } = useTools();
  const { departments, loading: loadingDepartments, error: errorDepartments } = useDepartments();

  const loading = loadingAnalytics || loadingTools || loadingDepartments;
  const error = errorAnalytics || errorTools || errorDepartments;

  const value: DashboardContextType = {
    tools,
    analytics,
    departments,
    loading,
    error,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
