import { useState, useEffect, FormEvent } from 'react';
import { Expense, Property, Lead } from '../types';
import { defaultProperties, defaultLeads } from '../data';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'effort' | 'properties' | 'leads'>('effort');

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('sgx_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('sgx_properties');
    return saved ? JSON.parse(saved) : defaultProperties;
  });
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('sgx_leads');
    return saved ? JSON.parse(saved) : defaultLeads;
  });

  useEffect(() => { localStorage.setItem('sgx_expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('sgx_properties', JSON.stringify(properties)); }, [properties]);
  useEffect(() => { localStorage.setItem('sgx_leads', JSON.stringify(leads)); }, [leads]);

  // Form states EFFORT
  const [effProperty, setEffProperty] = useState('');
  const [effCategory, setEffCategory] = useState('Marketing / Ads');
  const [effAmount, setEffAmount] = useState('');
  const [effDescription, setEffDescription] = useState('');

  const handleEffortSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!effAmount || isNaN(Number(effAmount))) return;
    
    const propToLog = effProperty || (properties.length > 0 ? properties[0].title : 'General');

    const newExp: Expense = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('es-ES'),
      property: propToLog,
      category: effCategory,
      amount: parseFloat(effAmount),
      description: effDescription
    };
    
    setExpenses([newExp, ...expenses]);
    setEffAmount('');
    setEffDescription('');
  };

  const clearExpenses = () => {
    if (confirm('¿Seguro que quieres borrar todos los registros? Esto no se puede deshacer.')) setExpenses([]);
  };

  const deleteExpense = (id: string) => setExpenses(expenses.filter(e => e.id !== id));

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Form states PROPERTIES
  const [propTitle, setPropTitle] = useState('');
  const [propLocation, setPropLocation] = useState('');
  const [propStats, setPropStats] = useState('');
  const [propPrice, setPropPrice] = useState('');
  const [propStatus, setPropStatus] = useState('ACTIVO');
  const [propImage, setPropImage] = useState('');
  const [propPanos, setPropPanos] = useState('');

  const handlePropertySubmit = (e: FormEvent) => {
    e.preventDefault();
    const newProp: Property = {
      id: crypto.randomUUID(),
      title: propTitle,
      location: propLocation,
      stats: propStats,
      price: Number(propPrice) || 0,
      status: propStatus,
      image: propImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
      panoUrls: propPanos.split('\n').map(u => u.trim()).filter(u => u.length > 0),
      views: 0
    };
    setProperties([newProp, ...properties]);
    setPropTitle(''); setPropLocation(''); setPropStats(''); setPropPrice(''); setPropImage(''); setPropPanos('');
  };

  const deleteProperty = (id: string) => {
    if (confirm('¿Borrar propiedad?')) setProperties(properties.filter(p => p.id !== id));
  };

  // Form states LEADS
  const [leadName, setLeadName] = useState('');
  const [leadInterest, setLeadInterest] = useState('');
  const [leadSource, setLeadSource] = useState('Website');
  const [leadStatus, setLeadStatus] = useState('NUEVO');

  const handleLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: crypto.randomUUID(),
      name: leadName,
      timeAgo: 'Justo ahora',
      interest: leadInterest,
      source: leadSource,
      status: leadStatus,
      initials: leadName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()
    };
    setLeads([newLead, ...leads]);
    setLeadName(''); setLeadInterest('');
  };

  const deleteLead = (id: string) => {
    if (confirm('¿Borrar prospecto?')) setLeads(leads.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 py-6">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <span className="text-slate-400 text-sm">Dashboard / </span>
          <span className="text-slate-900 font-semibold text-sm">Global Overview</span>
          <h2 className="text-3xl font-bold uppercase mt-2 text-slate-900 tracking-tight">Admin Interface</h2>
        </div>
        <div className="flex items-center gap-2 hidden sm:flex">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Logging Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Nav */}
        <div className="md:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-fit space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Operations</div>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('effort')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${activeTab === 'effort' ? 'bg-indigo-600 text-white cursor-default' : 'hover:bg-slate-100 text-slate-600'}`}>
              <span className={`w-5 h-5 flex items-center justify-center ${activeTab === 'effort' ? 'opacity-80' : 'opacity-50'}`}>⊞</span>
              <span className="text-sm font-medium">Effort Tracker</span>
            </button>
            <button 
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${activeTab === 'properties' ? 'bg-indigo-600 text-white cursor-default' : 'hover:bg-slate-100 text-slate-600'}`}>
              <span className={`w-5 h-5 flex items-center justify-center ${activeTab === 'properties' ? 'opacity-80' : 'opacity-50'}`}>⌘</span>
              <span className="text-sm font-medium">Propiedades</span>
            </button>
            <button 
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${activeTab === 'leads' ? 'bg-indigo-600 text-white cursor-default' : 'hover:bg-slate-100 text-slate-600'}`}>
              <span className={`w-5 h-5 flex items-center justify-center ${activeTab === 'leads' ? 'opacity-80' : 'opacity-50'}`}>👥</span>
              <span className="text-sm font-medium">Leads</span>
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-9 flex flex-col gap-6">
          
          {activeTab === 'effort' && (
            <>
              {/* Summary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Invertido</p>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                      ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-indigo-600 font-medium">
                    <span>↑ {expenses.length} Transacciones totales</span>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Estado de Sync</p>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Sincronizado</h3>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Storage persistente activo</span>
                  </div>
                </div>
              </div>
              
              {/* Add Expense Form */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-5">Log de Gastos Operativos</h4>
                <form onSubmit={handleEffortSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Propiedad</label>
                    <select 
                      value={effProperty} 
                      onChange={(e) => setEffProperty(e.target.value)}
                      className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
                    >
                      {properties.map(p => (
                        <option key={p.id} value={p.title}>{p.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Categoría</label>
                    <select 
                      value={effCategory} 
                      onChange={(e) => setEffCategory(e.target.value)}
                      className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
                    >
                      <option>Marketing / Ads</option>
                      <option>Mantenimiento</option>
                      <option>Staging</option>
                      <option>Transporte</option>
                      <option>Legal / Gastos Fijos</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Monto ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={effAmount}
                      onChange={(e) => setEffAmount(e.target.value)}
                      required
                      className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition" 
                      placeholder="0.00" 
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Descripción del Esfuerzo</label>
                    <textarea 
                      value={effDescription}
                      onChange={(e) => setEffDescription(e.target.value)}
                      required
                      className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none h-24 resize-none focus:ring-2 focus:ring-indigo-500 transition" 
                      placeholder="Detalla el trabajo realizado..."
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2 mt-2">
                    <button type="submit" className="bg-indigo-600 text-white px-5 py-2.5 rounded-md font-medium text-sm hover:bg-indigo-700 transition flex items-center justify-center w-full sm:w-auto shadow-sm">
                      Registrar Esfuerzo
                    </button>
                  </div>
                </form>
              </div>

              {/* Expense Log Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-bold text-slate-800">Reporte de Transparencia</h4>
                  <div className="flex gap-4 items-center">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {expenses.length} TOTAL
                    </span>
                    {expenses.length > 0 && (
                      <button onClick={clearExpenses} className="text-[10px] font-bold tracking-wider text-slate-400 hover:text-red-500 transition uppercase">
                        Resetear
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-12 px-6 py-3 border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <div className="col-span-2">Fecha</div>
                  <div className="col-span-3">Categoría</div>
                  <div className="col-span-4">Descripción</div>
                  <div className="col-span-2 text-right">Inversión</div>
                  <div className="col-span-1 text-center">Act</div>
                </div>

                <div className="divide-y divide-slate-50 h-72 overflow-y-auto">
                  {expenses.length === 0 ? (
                    <div className="px-6 py-12 text-center text-sm text-slate-400 font-medium italic">
                      No hay gastos registrados aún.
                    </div>
                  ) : (
                    expenses.map((exp) => (
                      <div key={exp.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-50 transition group">
                        <div className="col-span-2 text-xs text-slate-500 font-mono">{exp.date}</div>
                        <div className="col-span-3">
                          <span className="text-xs font-semibold text-slate-800">{exp.category}</span>
                        </div>
                        <div className="col-span-4 text-xs text-slate-500 truncate pr-4" title={exp.description}>
                          {exp.description}
                        </div>
                        <div className="col-span-2 text-right text-xs font-mono font-bold text-slate-700">
                          ${exp.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="col-span-1 text-center">
                          <button onClick={() => deleteExpense(exp.id)} className="text-slate-300 opacity-0 group-hover:opacity-100 transition hover:text-red-500 hover:bg-red-50 p-1 rounded" aria-label="Eliminar gasto">×</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'properties' && (
            <div className="flex flex-col gap-6">
              {/* Add Property Form */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-5">Añadir Nueva Propiedad</h4>
                <form onSubmit={handlePropertySubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Título</label>
                    <input value={propTitle} onChange={e=>setPropTitle(e.target.value)} required className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: Villa Oasis" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Ubicación</label>
                    <input value={propLocation} onChange={e=>setPropLocation(e.target.value)} required className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: Dorado" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Precio ($)</label>
                    <input value={propPrice} onChange={e=>setPropPrice(e.target.value)} required type="number" step="0.01" className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Estadísticas</label>
                    <input value={propStats} onChange={e=>setPropStats(e.target.value)} required className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: 3 Hab | 2 Baños" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Status</label>
                    <select value={propStatus} onChange={e=>setPropStatus(e.target.value)} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>ACTIVO</option>
                      <option>NUEVO</option>
                      <option>EN CONTRATO</option>
                      <option>VENDIDO</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Imagen Principal URL (Opcional)</label>
                    <input value={propImage} onChange={e=>setPropImage(e.target.value)} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://..." />
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Fotos 360 URLs (Una por línea)</label>
                    <textarea value={propPanos} onChange={e=>setPropPanos(e.target.value)} required rows={3} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://..."></textarea>
                  </div>
                  <div className="md:col-span-3 mt-2">
                    <button type="submit" className="bg-indigo-600 text-white px-5 py-2.5 rounded-md font-medium text-sm hover:bg-indigo-700 transition w-full sm:w-auto">Añadir Propiedad</button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-bold text-slate-800">Inventario Activo</h4>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{properties.length} TOTAL</span>
                </div>
                <div className="grid grid-cols-6 px-6 py-3 border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <div className="col-span-2">Propiedad</div>
                  <div>Precio</div>
                  <div>Status</div>
                  <div className="text-right">Vistas 360</div>
                  <div className="text-center">Act</div>
                </div>
                <div className="divide-y divide-slate-50">
                  {properties.map(p => (
                    <div key={p.id} className="grid grid-cols-6 px-6 py-4 items-center hover:bg-slate-50 transition group">
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                          <img src={p.image} className="w-full h-full object-cover" alt="Thumb" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-800 block truncate w-32 md:w-full">{p.title}</span>
                          <span className="text-[10px] text-slate-400 uppercase block">{p.location}</span>
                        </div>
                      </div>
                      <div className="text-xs font-mono font-bold text-indigo-600">${p.price.toLocaleString()}</div>
                      <div>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                          p.status === 'ACTIVO' || p.status === 'NUEVO' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="text-right font-mono text-xs text-slate-500">{p.panoUrls?.length || 0} res</div>
                      <div className="text-center">
                        <button onClick={() => deleteProperty(p.id)} className="text-slate-300 opacity-0 group-hover:opacity-100 transition hover:text-red-500 hover:bg-red-50 p-1 rounded">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="flex flex-col gap-6">
              {/* Add Lead Form */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-5">Nuevo Prospecto (Lead)</h4>
                <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Nombre Completo</label>
                    <input value={leadName} onChange={e=>setLeadName(e.target.value)} required className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: Ana Pérez" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Interés (Propiedad)</label>
                    <select value={leadInterest} onChange={e=>setLeadInterest(e.target.value)} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">Seleccione propiedad</option>
                      {properties.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                      <option value="General">Búsqueda General</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Fuente</label>
                    <select value={leadSource} onChange={e=>setLeadSource(e.target.value)} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Website</option>
                      <option>SGX Showcase</option>
                      <option>Referido</option>
                      <option>Social Media</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 mb-1.5 block font-bold tracking-widest">Status</label>
                    <select value={leadStatus} onChange={e=>setLeadStatus(e.target.value)} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>NUEVO</option>
                      <option>CONTACTADO</option>
                      <option>CALIFICADO</option>
                      <option>DESCARTADO</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 mt-2">
                    <button type="submit" className="bg-indigo-600 text-white px-5 py-2.5 rounded-md font-medium text-sm hover:bg-indigo-700 transition w-full sm:w-auto">Registrar Lead</button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-bold text-slate-800">Pipeline de Leads</h4>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{leads.length} ACTIVOS</span>
                </div>
                <div className="grid grid-cols-6 px-6 py-3 border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <div className="col-span-2">Prospecto</div>
                  <div>Interés</div>
                  <div>Fuente</div>
                  <div className="text-right">Estado</div>
                  <div className="text-center">Act</div>
                </div>
                <div className="divide-y divide-slate-50">
                  {leads.map(l => (
                    <div key={l.id} className="grid grid-cols-6 px-6 py-4 items-center hover:bg-slate-50 transition group">
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">{l.initials}</div>
                        <div>
                          <span className="text-sm font-bold text-slate-800 block truncate w-32 md:w-full">{l.name}</span>
                          <span className="text-[10px] text-slate-400 block">{l.timeAgo}</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 font-medium whitespace-nowrap truncate">{l.interest}</div>
                      <div className="text-xs text-slate-500">{l.source}</div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                          l.status === 'NUEVO' ? 'bg-slate-100 text-slate-600' : 
                          l.status === 'CONTACTADO' ? 'bg-indigo-50 text-indigo-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {l.status}
                        </span>
                      </div>
                      <div className="text-center">
                        <button onClick={() => deleteLead(l.id)} className="text-slate-300 opacity-0 group-hover:opacity-100 transition hover:text-red-500 hover:bg-red-50 p-1 rounded">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
