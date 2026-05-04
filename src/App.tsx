/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <Navbar />
        
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
        </main>
        
        <footer className="h-12 bg-slate-900 border-t border-slate-800 px-8 flex items-center justify-center text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-auto">
          <div className="flex gap-6">
            <span>Propulsado por la arquitectura SGX</span>
            <span>© 2026 Paraíso Real Bienes Raíces</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}
