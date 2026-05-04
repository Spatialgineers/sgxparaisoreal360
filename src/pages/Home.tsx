import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-12 items-center pt-8 pb-4">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold leading-tight border-l-4 border-indigo-500 pl-6 uppercase text-slate-900 tracking-tight">
            Yamira <br />
            <span className="text-indigo-600">Paraíso Real</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Realtor® con enfoque estratégico y tecnológico. Transformando la visualización inmobiliaria en experiencias inmersivas que cierran tratos.
          </p>
          <div className="flex gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center flex-1">
              <span className="block text-2xl font-bold text-slate-900">15+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase mt-1 block tracking-wider">Años Exp.</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center flex-1">
              <span className="block text-2xl font-bold text-slate-900">100%</span>
              <span className="text-xs font-semibold text-slate-500 uppercase mt-1 block tracking-wider">Transparencia</span>
            </div>
          </div>
        </div>
        
        <div className="h-[400px] bg-slate-200 rounded-xl overflow-hidden relative group border border-slate-200 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-700"
            alt="Interior"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm">
            <Link
              to="/properties"
              className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-110 transition"
              aria-label="View Properties"
            >
              <Eye className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 pb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
          <h3 className="text-sm font-bold text-slate-800 mb-4 tracking-tight uppercase">Licencias & Certificaciones</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-sm text-slate-500 font-medium">Licencia de Corredor (PR)</span>
              <span className="text-sm font-mono font-bold text-slate-900">Lic. #C-18492</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded">SRS Certified</span>
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded">C2EX Endorsed</span>
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded">Luxury Homes</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4 tracking-tight uppercase">Regiones Clave</h3>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Dorado</li>
            <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>San Juan</li>
            <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Isabela</li>
            <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Rincón</li>
          </ul>
        </div>

        <div className="bg-indigo-600 p-6 rounded-xl border border-indigo-700 shadow-sm flex flex-col justify-center text-white">
          <h3 className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-2">Total Histórico</h3>
          <div className="text-4xl font-bold tracking-tight">120+</div>
          <div className="text-xs text-indigo-200 font-medium mt-1">Propiedades Vendidas</div>
          <div className="mt-5 pt-5 border-t border-indigo-500/50">
            <div className="text-2xl font-bold tracking-tight">$35M+</div>
            <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mt-1">Volumen de Ventas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
