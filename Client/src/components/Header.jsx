import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; 
import { ImCross } from "react-icons/im";
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-400 hover:scale-105 transition-transform duration-300"
        >
          PortfolioBooster
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/templates" className="hover:text-yellow-400 transition">Templates</Link>
          <Link to="/create" className="hover:text-yellow-400 transition">Create</Link>
          <Link to="/preview" className="hover:text-yellow-400 transition">Preview</Link>
          <Link
            to="/login"
            className="hover:text-yellow-400 border border-yellow-400 px-3 py-1 rounded-md transition hover:bg-yellow-400 hover:text-slate-900"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-400 text-3xl transition-transform duration-300 hover:rotate-90"
          onClick={() => setOpen(!open)}
        >
          {open ? <ImCross />: <FiMenu />} {/* Toggle between Menu and Close icon */}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-6 pb-4 space-y-3 text-center animate-slideDown">
          <Link onClick={() => setOpen(false)} to="/" className="block text-white hover:text-yellow-400">Home</Link>
          <Link onClick={() => setOpen(false)} to="/templates" className="block text-white hover:text-yellow-400">Templates</Link>
          <Link onClick={() => setOpen(false)} to="/create" className="block text-white hover:text-yellow-400">Create</Link>
          <Link onClick={() => setOpen(false)} to="/preview" className="block text-white hover:text-yellow-400">Preview</Link>
          <Link onClick={() => setOpen(false)} to="/login" className="block text-yellow-400 font-semibold border border-yellow-400 rounded-md py-1 hover:bg-yellow-400 hover:text-slate-900 transition">Login</Link>
        </div>
      )}
    </header>
  );
}
