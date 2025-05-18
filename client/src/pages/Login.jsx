import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  const token = localStorage.getItem('token')
  if (token) return <Navigate to="/" replace />

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      setMsg(res.data.message);
      localStorage.setItem('token', res.data.token)
      navigate('/')
      
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">

      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 
              duration-500 ease-in-out active:scale-95"
            >
              Log in
            </button>
          </div>

          <h2 className="text-center text-white">
            Don’t have an account ? {' '}
            <Link
              to="/register"
              className="px-3 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-500 transition duration-300 ease-in-out"
            >
              Register Now
            </Link>
          </h2>

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-indigo-600">
            {msg}
          </h2>
        </form>
      </div>
    </div>
  );
};

export default Login;