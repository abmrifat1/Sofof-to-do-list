'use client';
import { useState } from 'react';
import { api } from '../lib/api';
import { TodoStatus } from '../types/todo';

export default function TodoForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<TodoStatus>('PENDING');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      setLoading(true);
      await api.post('/todos', { title: title.trim(), description: description.trim(), status });
      setTitle('');
      setDescription('');
      setStatus('PENDING');
      onCreated();
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Failed to create todo');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mb-4 space-y-2">
      {error && <div className="text-red-600">{error}</div>}

      <div className="flex flex-col md:flex-row md:items-center gap-2 bg-green-200 p-4 rounded">
        <input
          className="w-full md:flex-1 min-w-0 border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="w-full md:flex-1 min-w-0 border p-2 rounded"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          id="todo-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TodoStatus)}
          className="w-full h-11 md:w-40 min-w-0 border rounded px-3 py-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 md:w-auto bg-blue-600 text-white px-5 py-2 rounded"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  );
}