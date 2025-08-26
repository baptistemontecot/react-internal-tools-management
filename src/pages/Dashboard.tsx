'use client';

import { useDepartments } from '../hooks/useDepartment.ts';

export default function Dashboard() {
  const { departments, loading, error } = useDepartments();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
      <div>
        <h1>Departments</h1>
        <ul>
          {departments.map((d) => (
            <li key={d.id}>
              <h2>{d.name}</h2>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
