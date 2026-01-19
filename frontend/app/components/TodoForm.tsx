'use client';
import { useState } from 'react';
import { api } from '../lib/api';

export default function TodoForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      setLoading(true);
      await api.post('/todos', { title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
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
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
      <input
        className="w-full border p-2 rounded"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
}