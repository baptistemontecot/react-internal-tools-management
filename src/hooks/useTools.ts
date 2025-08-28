import api from './../utils/api';
import type { Tools } from '../types';
import { useEffect, useState } from 'react';

export default function useTools() {
  const [tools, setTools] = useState<Tools[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      api
        .get<Tools[]>('/tools')
        .then((res) => setTools(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  return { tools, loading, error };
}
