import { useEffect, useState } from 'react';
import type { Department } from '../types';
import api from './../utils/api';

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<Department[]>('/departments')
      .then((res) => setDepartments(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { departments, loading, error };
}
