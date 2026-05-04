import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Propiedades', path: '/properties' },
  ];

  return (
    <nav className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
        </div>
        <h1 className="text-white font-bold tracking-tight text-xl">Paraíso Real</h1>
      </div>
      
      <div className="flex gap-6 items-center text-xs font-semibold uppercase tracking-wider">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`transition hover:text-white ${
              location.pathname === link.path ? 'text-white' : 'text-slate-400'
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/admin"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="w-4 h-4 opacity-80 flex items-center justify-center text-base leading-none">⊞</span>
          Admin Dashboard
        </Link>
      </div>
    </nav>
  );
}
