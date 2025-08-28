import api from './../utils/api';
import { useEffect, useState } from 'react';
import type { Departments } from '../types';

export function useDepartments() {
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<Departments[]>('/departments')
      .then((res) => setDepartments(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { departments, loading, error };
}
