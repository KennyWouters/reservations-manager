// app/page.js
'use client'
import { useState } from 'react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email, password } : { email, password, name })
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = '/calendar';
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="flex mb-6">
            <button
                className={`flex-1 p-2 ${isLogin ? 'bg-blue-500 text-white' : 'text-gray-600'} rounded-l`}
                onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
                className={`flex-1 p-2 ${!isLogin ? 'bg-blue-500 text-white' : 'text-gray-600'} rounded-r`}
                onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
                {error}
              </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
                <div className="mb-4">
                  <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 border rounded"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                  />
                </div>
            )}
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
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </main>
  );
}