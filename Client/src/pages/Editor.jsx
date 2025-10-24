import React, { useEffect, useState } from 'react';
import API from '../Api';
import { useNavigate } from 'react-router-dom';

export default function Editor() {
  const [data, setData] = useState({ about: '', skills: [], projects: [], education: [], contact: {}, socials: {} });
  const [skillInput, setSkillInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/portfolio');
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const save = async () => {
    try {
      await API.post('/portfolio', data);
      alert('Saved');
      setData({ 
      about: '', 
      skills: [], 
      projects: [], 
      education: [], 
      contact: {}, 
      socials: {} 
    });
    } catch (err) { alert('Error'); }
  };

  const addSkill = () => {
    if (skillInput.trim()) setData({ ...data, skills: [...(data.skills||[]), skillInput.trim()] });
    setSkillInput('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Editor</h1>
        <div className="space-x-2">
          <button onClick={() => navigate('/preview/' + (data.user || 'me'))} className="px-3 py-2 border rounded">Preview</button>
          <button onClick={save} className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>

      <div className="grid gap-4">
        <textarea placeholder="About" value={data.about||''} onChange={(e)=>setData({...data, about:e.target.value})} className="w-full p-2 border rounded h-28" />

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Skills</h3>
          <div className="flex gap-2 mt-2">
            <input value={skillInput} onChange={(e)=>setSkillInput(e.target.value)} placeholder="Add skill" className="p-2 border rounded" />
            <button onClick={addSkill} className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(data.skills||[]).map((s,i)=>(<span key={i} className="px-2 py-1 border rounded">{s}</span>))}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Projects (sample)</h3>
          {/* Simple add project UI */}
          <ProjectEditor data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

function ProjectEditor({ data, setData }) {
  const [p, setP] = useState({ title: '', description: '', link: '' });
  const add = () => {
    if (!p.title) return;
    setData({ ...data, projects: [...(data.projects||[]), p] });
    setP({ title: '', description: '', link: '' });
  };
  return (
    <div>
      <input value={p.title} onChange={(e)=>setP({...p,title:e.target.value})} placeholder="Project title" className="w-full p-2 border rounded my-2" />
      <textarea value={p.description} onChange={(e)=>setP({...p,description:e.target.value})} placeholder="Short description" className="w-full p-2 border rounded my-2" />
      <input value={p.link} onChange={(e)=>setP({...p,link:e.target.value})} placeholder="Link" className="w-full p-2 border rounded my-2" />
      <button onClick={add} className="px-3 py-2 bg-indigo-600 text-white rounded">Add project</button>
      <div className="mt-3">
        {(data.projects||[]).map((proj,i)=>(
          <div key={i} className="border p-2 rounded my-2">
            <div className="font-semibold">{proj.title}</div>
            <div className="text-sm">{proj.description}</div>
            <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm">Open</a>
          </div>
        ))}
      </div>
    </div>
  );
}