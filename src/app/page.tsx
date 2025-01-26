// app/page.js
'use client'
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to calendar page (we'll create this next)
        window.location.href = '/calendar';
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl mb-6 font-bold">Login</h1>
          {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
                {error}
              </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
            <div className="mb-6">
              <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </main>
  );
}