import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Api';

const templates = [
  { id: 'clean', title: 'Clean' },
  { id: 'modern', title: 'Modern' }
];

export default function TemplateSelector() {
  const navigate = useNavigate();

  const choose = async (id) => {
    try {
      await API.post('/portfolio', { template: id });
      navigate('/editor');
    } catch (err) {
      alert('Error');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Choose a template</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {templates.map(t => (
          <div key={t.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{t.title}</h2>
            <p className="text-sm mt-2">A responsive {t.title} template.</p>
            <button onClick={() => choose(t.id)} className="mt-4 px-3 py-2 bg-indigo-600 text-white rounded">Choose</button>
          </div>
        ))}
      </div>
    </div>
  );
}