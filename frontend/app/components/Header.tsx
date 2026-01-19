'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { getToken, setToken } from '../lib/auth'; // adjust path if needed

export default function Header() {
  // const [token, setTokenState] = useState<string | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   setTokenState(getToken());
  //   console.log('===========tokentoken=========================');
  //   console.log(token);
  //   console.log('====================================');
  // }, [token]);


  // function handleLogout() {
  //   setToken(null);
  //   setTokenState(null);
  //   router.push('/login');
  // }

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">SOFOF TECH LIMITED</h1>
        {/* <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          {!token ? (
            <Link href="/login" className="text-blue-600">Login</Link>
          ) : <></>}
        </nav> */}
      </div>
    </header>
  );
}