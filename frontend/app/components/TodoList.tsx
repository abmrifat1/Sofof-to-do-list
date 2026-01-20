'use client';

import { Todo } from '../types/todo';
import { api } from '../lib/api';

export default function TodoList({ todos, fetchTodoList }: { todos: Todo[]; fetchTodoList: () => void }) {
  async function markDone(id: string) {
    try {
      await api.put(`/todos/${id}`, { status: 'DONE' });
      fetchTodoList();
    } catch (err) {
      alert('Failed to update todo');
    }
  }

  async function del(id: string) {
    if (!confirm('Delete this todo?')) return;
    try {
      await api.delete(`/todos/${id}`);
      fetchTodoList();
    } catch (err) {
      alert('Failed to delete todo');
    }
  }

  if (todos.length === 0) {
    return <div className="text-gray-600">No todos yet</div>;
  }

  return (
    <div className="space-y-2">
      {todos.map((t) => (
        <div key={t.id} className="border rounded p-3 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{t.title}</h3>
              <span className={`text-xs px-2 py-1 rounded ${t.status === 'DONE' ? 'bg-green-200 text-green-700' : t.status === 'IN_PROGRESS' ? 'bg-blue-200 text-blue-700' : 'bg-yellow-200 text-yellow-700'}`}>
                {t.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">{t.description}</div>
            <div className="text-xs text-gray-400 mt-2">Created: {t.createdAt ? new Date(t.createdAt).toLocaleString() : ''}</div>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            {t.status !== 'DONE' && (
              <button onClick={() => markDone(t.id)} className="bg-green-500 text-white px-3 py-1 rounded">
                Mark Done
              </button>
            )}
            <button onClick={() => del(t.id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
