'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setResultMessage(`User created successfully! ID: ${data.id}`);
        setIsError(false);
      } else {
        const error = await response.text();
        setResultMessage(`Error: ${error}`);
        setIsError(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResultMessage(`Error: ${error.message}`);
      } else {
        setResultMessage('An unknown error occurred.');
      }
      setIsError(true);
    }
  };

  return (
    <div className="w-80 mx-auto mt-20 p-8 bg-[#e8f2dd] rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6 text-[#6a8d5d]">회원가입</h2>
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-[#6a8d5d] text-white rounded-md hover:bg-[#5a7d4d] transition">
          회원가입
        </button>
      </form>
      {/* resultMessage -> 에러 메시지 */}
      {resultMessage && (
        <div className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
          회원가입에 실패했습니다.
        </div>
      )}
      {!isError && resultMessage && (
        <div className="mt-2 text-center">
          <Link href="/login" className="text-[#6a8d5d] hover:underline">
            로그인으로 이동
          </Link>
        </div>
      )}
    </div>
  );
}
