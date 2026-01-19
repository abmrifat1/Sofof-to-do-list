'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { api } from '../lib/api';
import { getToken, setToken } from '../lib/auth';
import Link from 'next/link';
import type { Todo } from '../types/todo';

export default function TodoAppClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>('');
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState<string | null>('');
  const router = useRouter();

  async function fetchTodos() {
    setLoading(true);
    try {
      const qs = statusFilter ? `?status=${statusFilter}` : '';
      const res = await api.get(`/todos${qs}`);
      setTodos(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        setToken(null);
        router.push('/login');
      } else {
        console.error('Failed to load todos', err);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = getToken();
    setJwtToken(token)
    if (!token) {
      router.push('/login'); // redirect if no token
      return;
    }
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  function handleLogout() {
    setToken(null);
    router.push('/login');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <label className="text-sm mr-2">Filter:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-1">
            <option value="">All</option>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {jwtToken ?
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            :
            <Link href="/login" className="text-blue-600">Login</Link>
          }
        </div>

      </div>

      <TodoForm onCreated={fetchTodos} />
      {loading ? <div>Loading...</div> : <TodoList todos={todos} refresh={fetchTodos} />}
    </div>
  );
}