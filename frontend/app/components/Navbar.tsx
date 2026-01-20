'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, setToken } from '../lib/auth';

export default function Navbar() {
  const [token, setTokenState] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setTokenState(getToken());
  }, [token]);


  function handleLogoutSubmit() {
    setToken(null);
    setTokenState(null);
    router.push('/login');
  }

  return (
    <header className="bg-white shadow-sm">
      {!token ? (
        <></>
      ) : (
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">TO DO APPLICATION</h1>
          <nav className="flex items-center gap-4">

            <button onClick={handleLogoutSubmit} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </nav>
        </div>
      )}
    </header>
  );
}