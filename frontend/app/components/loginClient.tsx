'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { setToken } from '../lib/auth';

export default function LoginClient() {
  const [userName, setUserName] = useState('Sofof Tech');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const apiUrl = process.env.API_URL || 'http://localhost:3001';

  async function onSubmitClick(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, { userName, password });
      const token = res.data?.access_token;
      if (!token) {
        setError('Invalid credentials');
        return;
      }
      setToken(token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmitClick} className="bg-white p-6 rounded shadow w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <label className="block mb-2">
        <div className="text-sm text-gray-700">User Name</div>
        <input
          className="w-full border p-2 rounded"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>

      <label className="block mb-4">
        <div className="text-sm text-gray-700">Password</div>
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}