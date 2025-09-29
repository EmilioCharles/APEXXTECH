import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Layers className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold text-slate-800">ApexxTech</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Agents</Link>
            {/* NEW: Added a link to the new pricing page */}
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          <div>
             <a href="#" className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

