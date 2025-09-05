
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 text-center border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
        CSE AI Tutor
      </h1>
      <p className="text-sm text-slate-400">Your Personal Assistant for Computer Science & Engineering Subjects</p>
    </header>
  );
};

export default Header;
