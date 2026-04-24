import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Droplet, 
  Thermometer, 
  Zap, 
  History, 
  Sparkles,
  ArrowRight,
  Loader2,
  Activity,
  AlertTriangle,
  TrendingUp,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CropHealth: React.FC = () => {
  const [sectors, setSectors] = useState([
    { id: 'A', name: 'North Sector A', status: 'Healthy', score: 96, prevScore: 96, icon: CheckCircle2, color: 'emerald', moisture: 45, temp: 28 },
    { id: 'B', name: 'East Sector B', status: 'Moderate', score: 72, prevScore: 72, icon: AlertCircle, color: 'amber', moisture: 32, temp: 31 },
    { id: 'C', name: 'South Sector C', status: 'Risk', score: 45, prevScore: 45, icon: AlertCircle, color: 'rose', moisture: 18, temp: 34 },
    { id: 'D', name: 'West Sector D', status: 'Healthy', score: 92, prevScore: 92, icon: CheckCircle2, color: 'emerald', moisture: 42, temp: 27 },
  ]);

  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [interventionPlan, setInterventionPlan] = useState<string | null>(null);
  const [logs, setLogs] = useState([
    { t: 'Just now', s: 'North Sector A', m: 'Simulated NDVI Analysis', c: 'High (0.89)', st: 'Optimal' },
    { t: '4 mins ago', s: 'South Sector C', m: 'Simulated Sensor Data', c: 'Low (0.32)', st: 'Critical' },
    { t: '12 mins ago', s: 'East Sector B', m: 'Simulated NDVI Analysis', c: 'Moderate (0.55)', st: 'Warning' },
  ]);

  // Simulate real-time data variation
  useEffect(() => {
    const interval = setInterval(() => {
      setSectors(prev => prev.map(s => {
        const variation = (Math.random() * 2 - 1);
        const newScore = Math.min(100, Math.max(20, s.score + variation));
        return {
          ...s,
          prevScore: s.score,
          score: parseFloat(newScore.toFixed(1)),
          status: newScore > 85 ? 'Healthy' : newScore > 60 ? 'Moderate' : 'Risk',
          icon: newScore > 85 ? CheckCircle2 : newScore > 60 ? AlertCircle : AlertTriangle
        };
      }));

      // Update timestamps in logs
      setLogs(prev => [
        { t: 'Just now', s: sectors[Math.floor(Math.random() * sectors.length)].name, m: 'Simulated NDVI Analysis', c: (0.4 + Math.random() * 0.5).toFixed(2), st: Math.random() > 0.5 ? 'Optimal' : 'Warning' },
        ...prev.slice(0, 4)
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, [sectors]);

  const generateInterventionPlan = async (sectorName: string) => {
    setIsGeneratingPlan(true);
    setInterventionPlan(null);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const plans: Record<string, string> = {
      'North Sector A': "Maintain current moisture levels. Chlorophyll density is optimal. No immediate intervention required.",
      'East Sector B': "Detected slight nitrogen deficiency. Apply 15kg/ha urea-based fertilizer within 48 hours. Increase irrigation by 15%.",
      'South Sector C': "Critical blight risk detected. Immediate antifungal spray required. Isolate sector drainage to prevent spore spread.",
      'West Sector D': "Healthy growth detected. Minor thermal stress predicted for tomorrow. Pre-irrigation tonight is recommended."
    };

    setInterventionPlan(plans[sectorName] || "AI suggests routine monitoring and standard nutrient replenishment.");
    setIsGeneratingPlan(false);
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1 flex items-center gap-3">
            <Leaf className="w-8 h-8 text-emerald-400" />
            Crop Health Monitor
          </h2>
          <p className="text-slate-400 text-sm font-medium">Real-time AI-driven health monitoring across all farm sectors.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 uppercase tracking-widest animate-pulse">
                <Activity className="w-3 h-3" />
                Live Crop Monitoring Active
            </div>
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Search sectors..." className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm outline-none w-64 focus:border-emerald-500/50 transition-all text-white" />
            </div>
        </div>
      </div>

      {/* Sector Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {sectors.map((sector) => (
           <motion.div 
             key={sector.id}
             layoutId={`sector-${sector.id}`}
             onClick={() => { setSelectedSector(sector); setInterventionPlan(null); }}
             whileHover={{ y: -5, scale: 1.02 }}
             className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                sector.color === 'emerald' ? 'bg-emerald-500/5 border-emerald-500/20' : 
                sector.color === 'amber' ? 'bg-amber-500/5 border-amber-500/20' : 
                'bg-rose-500/5 border-rose-500/20'
             }`}
           >
              <div className="flex justify-between items-start mb-6 relative z-10">
                 <div className={`p-2.5 rounded-xl bg-surface/80 backdrop-blur-md border border-white/5 ${
                    sector.color === 'emerald' ? 'text-emerald-400' : 
                    sector.color === 'amber' ? 'text-amber-400' : 
                    'text-rose-400'
                 }`}>
                    <sector.icon className="w-6 h-6" />
                 </div>
                 <div className="text-right">
                    <motion.p 
                        key={sector.score}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-2xl font-black font-mono leading-none ${
                            sector.color === 'emerald' ? 'text-emerald-400' : 
                            sector.color === 'amber' ? 'text-amber-400' : 
                            'text-rose-400'
                        }`}
                    >
                        {sector.score}
                    </motion.p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Health Score</p>
                 </div>
              </div>

              <div className="relative z-10">
                 <h3 className="font-bold text-white text-lg mb-1">{sector.name}</h3>
                 <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        sector.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : 
                        sector.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : 
                        'bg-rose-500/20 text-rose-400'
                    }`}>
                        {sector.status}
                    </span>
                    <span className={`text-[10px] font-bold ${sector.score >= sector.prevScore ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {sector.score >= sector.prevScore ? '↑' : '↓'} {Math.abs(sector.score - sector.prevScore).toFixed(1)}%
                    </span>
                 </div>
              </div>

              {/* Progress Bar Background */}
              <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${sector.score}%` }}
                    className={`h-full ${
                        sector.color === 'emerald' ? 'bg-emerald-500' : 
                        sector.color === 'amber' ? 'bg-amber-500' : 
                        'bg-rose-500'
                    }`}
                />
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Detail Panel */}
        <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
                {selectedSector ? (
                    <motion.div 
                        key={selectedSector.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass-panel p-8 border border-white/5 relative overflow-hidden h-full flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-2xl bg-white/5 ${
                                    selectedSector.color === 'emerald' ? 'text-emerald-400' : 
                                    selectedSector.color === 'amber' ? 'text-amber-400' : 
                                    'text-rose-400'
                                }`}>
                                    <selectedSector.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{selectedSector.name}</h3>
                                    <p className="text-sm text-slate-400">Detailed Diagnostic Report (Real-Time)</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedSector(null)} className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
                                <ArrowRight className="w-5 h-5 rotate-180" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {[
                                { t: "Crop Health Score", v: `${selectedSector.score}/100`, i: Activity, c: selectedSector.color },
                                { t: "Soil Moisture", v: `${selectedSector.moisture}%`, i: Droplet, c: "secondary" },
                                { t: "Temperature Impact", v: `${selectedSector.temp}°C`, i: Thermometer, c: "warning" }
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-2 mb-2 text-slate-500 uppercase text-[10px] font-black">
                                        <item.i className="w-3.5 h-3.5" /> {item.t}
                                    </div>
                                    <p className="text-xl font-black text-white">{item.v}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-primary" /> AI Intervention Analysis
                                </h4>
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 relative group min-h-[120px] flex items-center justify-center text-center">
                                    {isGeneratingPlan ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                            <p className="text-xs font-bold text-slate-400 animate-pulse uppercase tracking-widest">Generating AI Intervention Plan...</p>
                                        </div>
                                    ) : interventionPlan ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-left">
                                            <p className="text-sm font-bold text-white mb-2 leading-relaxed italic">"{interventionPlan}"</p>
                                            <div className="flex gap-2 mt-4">
                                                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">NITROGEN_BOOST</span>
                                                <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-[10px] font-bold border border-secondary/20">IRRIGATION_FIX</span>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4">
                                            <p className="text-xs text-slate-500 font-medium max-w-xs">Detailed intervention plans are generated using the AgriVision AI engine based on current telemetry.</p>
                                            <button 
                                                onClick={() => generateInterventionPlan(selectedSector.name)}
                                                className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
                                            >
                                                <Zap className="w-3.5 h-3.5" /> View Intervention Plan
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-panel p-12 flex flex-col items-center justify-center text-center opacity-30 grayscale border-dashed border-2 h-full"
                    >
                        <Activity className="w-16 h-16 mb-4 text-slate-500" />
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Select a Sector</h3>
                        <p className="text-sm text-slate-500 max-w-xs">Click on any sector card to view real-time diagnostics, spectral analysis, and AI-driven intervention plans.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Log Panel */}
        <div className="lg:col-span-4 glass-panel p-6 border border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-secondary" />
                Spectral Analysis Log
            </h3>
            <div className="space-y-4">
                {logs.map((log, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/5 relative group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {log.t}
                            </span>
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                                log.st === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 
                                log.st === 'Warning' ? 'bg-amber-500/20 text-amber-400' : 
                                'bg-emerald-500/20 text-emerald-400'
                            }`}>
                                {log.st}
                            </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1">{log.s}</h4>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                            <span className="text-[9px] font-black text-slate-600 uppercase">{log.m}</span>
                            <span className="text-xs font-black text-white font-mono">NDVI: {log.c}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-xl bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">
                View Full Log History
            </button>
        </div>
      </div>
    </div>
  );
};

export default CropHealth;
