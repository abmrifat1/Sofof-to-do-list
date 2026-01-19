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
  const [statusFilter, setStatusFilter] = useState<string | undefined | number | string[]>('');
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState<string | null>('');
  const router = useRouter();

  async function fetchTodos() {
    setLoading(true);
    try {
      const qs = statusFilter ? `?status=${statusFilter}` : '';
      const res = await api.get(`/todos${qs}`);
      if (res?.data) {
        setTodos(res.data);
      } else {
        setTodos([])
      }
    } catch (err: any) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        setToken(null);
        router.push('/login');
      } else if (err?.response?.status === 404) {
        setTodos([]);
      } 
      else {
        console.error('Failed to load todos', err);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    const token = getToken();
    setJwtToken(token)
    if (!token) {
      // setLoading(false);
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
      {loading ?
        <div className="flex items-center justify-center h-screen">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        </div>
        :
        <>
          <header className="mb-6">
            <h1 className="text-xl font-bold">To-Do List</h1>
          </header>
          <div className="w-full bg-white p-4 rounded-lg shadow-sm mb-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <label className="text-md font-semibold text-gray-700">Filter</label>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 md:w-80 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setStatusFilter('')}
                  className="text-sm px-3 py-2 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <TodoForm onCreated={fetchTodos} />
          {loading ? <div>Loading...</div> : <TodoList todos={todos} refresh={fetchTodos} />}</>
      }

    </div>
  );
}