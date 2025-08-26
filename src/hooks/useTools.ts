import { useEffect, useState } from 'react';
import api from './../utils/api';
import type { Tool } from '../types';

export function useTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<Tool[]>('/tools')
      .then((res) => setTools(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { tools, loading, error };
}
