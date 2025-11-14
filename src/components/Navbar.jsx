import React from 'react';
import logoSekolah from '../assets/logoSekolah.png';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-default">
          <img src={logoSekolah} alt="logo SMKN 10 Semarang" className="h-12 w-12 object-contain"/>
          <h1 className="text-xl md:text-2xl font-bold">Kuesioner SMKN 10 Semarang</h1>
        </div>
        <div className="hidden sm:block cursor-default">
          <span className="text-sm text-gray-300 bg-blue-700 px-3 py-1 rounded-full">v1.2</span>
        </div>
      </div>
    </nav>
  );
}