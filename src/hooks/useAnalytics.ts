import { useEffect, useState } from 'react';
import api from './../utils/api';
import type { AnalyticsResponse } from '../types';

export default function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<AnalyticsResponse>('/analytics')
      .then((res) => setAnalytics(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { analytics, loading, error };
}
