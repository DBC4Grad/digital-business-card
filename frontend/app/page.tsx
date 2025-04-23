'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    // const password = formData.get('password') as string;

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        redirect: 'follow',
      });

      // * 안되면 이 방법으로 시도해보기
      // const response = await fetch('/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      //   redirect: 'follow',
      // });

      if (response.redirected || response.url.includes('/home')) {
        // If the response is redirected, it means login was successful
        // Save login information in AuthContext
        login(username);
        // Redirect to the home page
        router.push('/home');
      } else {
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="w-80 mx-auto mt-20 p-8 bg-[#e8f2dd] rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6 text-[#6a8d5d]">로그인</h2>
      {message && (
        <div className={`text-center mb-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
          아이디 또는 비밀번호가 잘못되었습니다.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 font-medium text-[#6a8d5d]">
            아이디
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            autoComplete="username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium text-[#6a8d5d]">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-[#6a8d5d] text-white rounded-md hover:bg-[#5a7d4d] transition">
          로그인
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link className="text-[#6a8d5d] hover:underline" href="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}
