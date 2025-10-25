import React from "react";
import { FaHeart, FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 text-center py-6 mt-10">
      <p className="text-sm flex items-center justify-center gap-1">
        <FaCopyright className="inline-block text-yellow-400 text-xs" />
        {new Date().getFullYear()}
        <span className="text-yellow-400 font-semibold">PortfolioBooster</span>.
        All rights reserved.
      </p>

      <p className="text-sm mt-1 flex items-center justify-center gap-1">
        Built with
        <FaHeart className="inline-block text-red-500 animate-pulse" /> by
        <span className="text-yellow-400 font-bold">Mehreen Shabir</span>
      </p>
    </footer>
  );
}
