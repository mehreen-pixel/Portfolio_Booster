import React, { useEffect, useState } from 'react';
import API from '../Api';
import { useParams } from 'react-router-dom';

export default function Preview() {
  const { userId } = useParams();
  const [data, setData] = useState(null);

  // ✅ Fetch portfolio (assuming /portfolio returns an array)
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/portfolio');
        const portfolio = Array.isArray(res.data) ? res.data[0] : res.data;
        setData(portfolio);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      }
    })();
  }, []);

  // ✅ Delete handler
 



  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold">{data.userName || 'Your Name'}</h1>
        <p className="mt-2">{data.about}</p>

        <section className="mt-4">
          <h2 className="font-semibold">Skills</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {(data.skills || []).map((s, i) => (
              <span key={i} className="px-2 py-1 border rounded">{s}</span>
            ))}
          </div>
        </section>

        <section className="mt-4">
          <h2 className="font-semibold">Projects</h2>
          <div className="mt-2 space-y-2">
            {(data.projects || []).map((p, i) => (
              <div key={i} className="p-3 border rounded">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm">{p.description}</div>
                {p.link && (
                  <a
                    href={p.link}
                    className="text-indigo-600 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ✅ Moved delete button OUTSIDE project loop */}
        
      </div>
    </div>
  );
}
