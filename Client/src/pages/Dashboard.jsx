import React, { useEffect, useState } from 'react';
import API from '../Api';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/portfolio');
        setPortfolio(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <Link to="/templates" className="px-4 py-2 bg-indigo-600 text-white rounded">Choose Template</Link>
          <button onClick={logout} className="px-3 py-2 border rounded">Logout</button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Live preview</h2>
          <div className="mt-3">
            <iframe title="preview" className="w-full h-96 border" src={`/preview/${portfolio?.user}`} />
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Edit portfolio</h2>
          <p className="mt-2">Add  update your details.</p>
          <div className="mt-4 space-y-2">
            <Link to="/editor" className="block px-4 py-2 bg-green-600 text-white rounded">Open editor</Link>
          </div>
        </div>
      </div>
    </div>
  );
}