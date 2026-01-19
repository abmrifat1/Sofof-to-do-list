'use client';

import { useEffect, useState } from "react";
import LoginClient from "../components/loginClient";
import { getToken, setToken } from '../lib/auth';
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const token = getToken();

    if (token) {
      router.push('/');
      return;
    }
    setLoading(false);
  }, []);

  return (
    <>
    <Navbar/>
      {loading ?
        <div className="flex items-center justify-center h-screen">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        </div>
        :
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <LoginClient />
        </div>
      }
    </>
  );
}