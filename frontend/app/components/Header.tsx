'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, setToken } from '../lib/auth'; // adjust path if needed

export default function Header() {
  const [token, setTokenState] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setTokenState(getToken());
  }, []);


  function handleLogout() {
    setToken(null);
    setTokenState(null);
    router.push('/login');
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">To-Do App</h1>
        <nav className="flex items-center gap-4">
          <Link href="/">{/* Link imported */}Home</Link>
          {!token ? (
            <Link href="/login" className="text-blue-600">Login</Link>
          ) : <></>}
        </nav>
      </div>
    </header>
  );
}