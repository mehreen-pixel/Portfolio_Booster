import React, { useState } from 'react';
import API from '../Api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create account</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <input name="name" value={form.name} onChange={onChange} placeholder="Full name" className="w-full p-2 border rounded" />
          <input name="email" value={form.email} onChange={onChange} placeholder="Email" className="w-full p-2 border rounded" />
          <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" className="w-full p-2 border rounded" />
          <button className="w-full bg-indigo-600 text-white py-2 rounded">Register</button>
        </form>
        <p className="mt-3 text-sm">Already have account? <Link to="/login" className="text-indigo-600">Login</Link></p>
      </div>
    </div>
  );
}