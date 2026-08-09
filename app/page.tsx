'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [resumen, setResumen] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResumen() {
      const { data } = await supabase.from('vista_resumen_contable').select('*').single();
      if (data) setResumen(data);
      setLoading(false);
    }
    fetchResumen();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-medium">Cargando Dashboard...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-slate-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión Silvia — Palta Mendoza</h1>
            <p className="text-slate-400 text-sm">Control de pallets, minoristas, stock y rendiciones</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Total Facturado" value={resumen?.total_facturado || 0} color="border-sky-500" />
          <Card title="Total Cobrado" value={resumen?.total_cobrado || 0} color="border-emerald-500" />
          <Card title="Saldo Pendiente" value={resumen?.total_pendiente || 0} color="border-rose-500" isAlert />
          <Card title="Comisión Silvia" value={resumen?.ganancia_silvia_comision || 0} color="border-amber-500" />
        </div>
      </div>
    </main>
  );
}

function Card({ title, value, color, isAlert }: { title: string; value: number; color: string; isAlert?: boolean }) {
  return (
    <div className={`bg-slate-800 rounded-xl p-5 border-l-4 ${color} border-slate-700/50 shadow-lg`}>
      <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">{title}</span>
      <div className={`text-2xl font-black mt-2 ${isAlert && value > 0 ? 'text-rose-400' : 'text-white'}`}>
        ${value.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
}
