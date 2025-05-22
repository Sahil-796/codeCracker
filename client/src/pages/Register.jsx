import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      })
      setMsg(res.data.message)
      navigate('/login')
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">Welcome to CodeCracker</h1>
          <p className="text-indigo-500 text-lg">Create your account</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 bg-[#f0f0f1] px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 bg-[#f0f0f1] px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="block w-full rounded-lg border border-gray-300 bg-[#f0f0f1] px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-indigo-500 transition duration-200 active:scale-[97%]"
            >
              Register
            </button>
            {msg && (
              <div className="text-center text-sm font-medium text-indigo-600 mt-2">{msg}</div>
            )}
          </form>
          <div className="mt-8 text-center">
            <span className="text-gray-600">Already have an account ?</span>{'  '}
            <Link
              to="/login"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 transition duration-200"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register