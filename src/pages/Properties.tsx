import { useState, useEffect } from 'react';
import { Rotate3D, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Viewer360 from '../components/Viewer360';
import { Property } from '../types';
import { defaultProperties } from '../data';

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [panoIndex, setPanoIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('sgx_properties');
    if (saved) {
      setProperties(JSON.parse(saved));
    } else {
      setProperties(defaultProperties);
    }
  }, []);

  const handleOpen360 = (prop: Property) => {
    setActiveProperty(prop);
    setPanoIndex(0);
  };

  const handleNext = () => {
    if (!activeProperty) return;
    setPanoIndex((i) => (i < activeProperty.panoUrls.length - 1 ? i + 1 : 0));
  };

  const handlePrev = () => {
    if (!activeProperty) return;
    setPanoIndex((i) => (i > 0 ? i - 1 : activeProperty.panoUrls.length - 1));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 py-6">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <span className="text-slate-400 text-sm">Dashboard / </span>
          <span className="text-slate-900 font-semibold text-sm">Propiedades</span>
          <h2 className="text-3xl font-bold uppercase mt-2 text-slate-900 tracking-tight">Listado Inmersivo</h2>
        </div>
        <div className="flex items-center gap-2 hidden sm:flex">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">SGX Showcase Online</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col">
            <img 
              src={prop.image} 
              className="rounded-lg w-full h-48 object-cover border border-slate-100" 
              alt={prop.title} 
            />
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{prop.status}</p>
              <h3 className="font-bold text-slate-900 text-lg">{prop.title}</h3>
              <p className="text-xs text-indigo-600 font-medium mt-1">${prop.price.toLocaleString()} | {prop.stats}</p>
            </div>
            <button 
              onClick={() => handleOpen360(prop)}
              className="w-full py-2 bg-indigo-600 text-white rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Rotate3D size={16} /> VER EN 360º {prop.panoUrls?.length > 1 ? `(${prop.panoUrls.length})` : ''}
            </button>
          </div>
        ))}
      </div>

      {/* 360 Modal Viewer with Carousel */}
      {activeProperty && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 p-4 md:p-12 flex flex-col backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="max-w-6xl w-full mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center bg-white p-4 rounded-t-xl border border-slate-200 z-10">
              <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900">
                {activeProperty.title} <span className="text-slate-300">/</span> <span className="text-indigo-600 tracking-tight">Motor WebGL SGX</span>
              </h3>
              <button 
                onClick={() => setActiveProperty(null)}
                className="p-1 hover:bg-slate-100 rounded text-slate-500 transition"
                aria-label="Cerrar visor"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 relative rounded-b-xl overflow-hidden shadow-2xl border-x border-b border-slate-200 bg-black">
              {/* Force remount of Viewer360 on url change for reliable texture loading */}
              <Viewer360 key={activeProperty.panoUrls[panoIndex]} url={activeProperty.panoUrls[panoIndex]} />
              
              {activeProperty.panoUrls?.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev} 
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition shadow-lg"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNext} 
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/50 text-white rounded-full text-xs font-medium backdrop-blur-md border border-white/10 shadow-lg tracking-widest uppercase">
                    Área {panoIndex + 1} de {activeProperty.panoUrls.length}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
