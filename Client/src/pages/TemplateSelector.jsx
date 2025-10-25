import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

const templates = [
  {
    id: "clean",
    title: "Clean",
    desc: "Minimal layout with a professional tone — perfect for personal portfolios.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "modern",
    title: "Modern",
    desc: "Trendy design with bold typography and vibrant colors.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "creative",
    title: "Creative",
    desc: "Perfect for designers — showcase your imagination beautifully.",
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    gradient: "from-rose-500 to-orange-400",
  },
  {
    id: "business",
    title: "Business",
    desc: "Corporate-style layout with clean sections and elegance.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "bold",
    title: "Bold",
    desc: "Strong colors and grid layout — make your work stand out.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    gradient: "from-yellow-400 to-red-500",
  },
  {
    id: "classic",
    title: "Classic",
    desc: "Timeless look with elegant typography and soft tones.",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    gradient: "from-slate-600 to-gray-800",
  },
  {
    id: "portfolio",
    title: "Portfolio Pro",
    desc: "Designed for developers and creators — sleek & modern.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "minimal",
    title: "Minimal",
    desc: "Simple, clean, and focused on your content.",
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    gradient: "from-gray-400 to-gray-700",
  },
];

export default function TemplateSelector() {
  const navigate = useNavigate();

  const choose = async (id) => {
    try {
      await API.post("/portfolio", { template: id });
      navigate("/editor");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Choose Your Dream Template
        </h1>
        <p className="text-gray-600 text-lg">
          Select a stunning design to start building your beautiful portfolio
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {templates.map((t) => (
          <div
            key={t.id}
            className="group bg-white shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative">
              <img
                src={t.img}
                alt={t.title}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${t.gradient} opacity-50 group-hover:opacity-70 transition-opacity`}
              ></div>
              <div className="absolute bottom-3 left-3 text-white text-xl font-semibold drop-shadow-lg">
                {t.title}
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-600 text-sm mb-4">{t.desc}</p>
              <button
                onClick={() => choose(t.id)}
                className={`w-full py-2 font-semibold text-white rounded-lg bg-gradient-to-r ${t.gradient} hover:opacity-90 transition`}
              >
                Choose Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
