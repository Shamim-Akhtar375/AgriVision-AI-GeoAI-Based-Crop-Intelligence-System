import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Beaker, 
  Settings2, 
  Loader2, 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  IndianRupee, 
  Zap, 
  ShieldCheck, 
  Info,
  ArrowRight,
  RefreshCw,
  Gauge,
  BrainCircuit
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Simulator: React.FC = () => {
  const [params, setParams] = useState({ temperature: 27.5, rainfall: 80, fertilizer: 100, field_size: 200 });
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [prevResult, setPrevResult] = useState<any>(null);

  const runSimulation = useCallback(async (currentParams: typeof params) => {
    setIsSimulating(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentParams)
      });
      if (res.ok) {
        const data = await res.json();
        setPrevResult(result);
        setResult(data);
      }
    } catch (e) {
      console.error("Simulation error:", e);
    } finally {
      setIsSimulating(false);
    }
  }, [result]);

  // Real-time debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      runSimulation(params);
    }, 500);
    return () => clearTimeout(timer);
  }, [params, runSimulation]);

  const handleParamChange = (key: keyof typeof params, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1 flex items-center gap-3">
            <Beaker className="w-8 h-8 text-primary" />
            Gen-AI Scenario Simulator
          </h2>
          <p className="text-slate-400 text-sm font-medium">Test what-if weather and input scenarios against the AI engine.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-black text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 uppercase tracking-widest">
                <Zap className={`w-3 h-3 ${isSimulating ? 'animate-pulse' : ''}`} />
                AI Simulation Running Live
            </div>
            <button 
                onClick={() => runSimulation(params)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
                title="Force Refresh"
            >
                <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Controls Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 flex-1 border border-white/5">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/5">
                <Settings2 className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Scenario Parameters</h3>
            </div>

            <div className="space-y-8">
                {[
                    { label: "Avg Temperature", key: "temperature", min: 10, max: 45, step: 0.5, unit: "°C", color: "text-rose-400", accent: "accent-rose-500" },
                    { label: "Predicted Rainfall", key: "rainfall", min: 0, max: 300, step: 1, unit: "mm", color: "text-secondary", accent: "accent-blue-500" },
                    { label: "Fertilizer Input", key: "fertilizer", min: 0, max: 300, step: 5, unit: "kg/ha", color: "text-primary", accent: "accent-primary" },
                    { label: "Target Field Size", key: "field_size", min: 10, max: 1000, step: 10, unit: "ha", color: "text-white", accent: "accent-slate-400" }
                ].map((item) => (
                    <div key={item.key} className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                            <span className={`font-mono text-sm font-bold ${item.color}`}>
                                {params[item.key as keyof typeof params]}{item.unit}
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min={item.min} 
                            max={item.max} 
                            step={item.step} 
                            value={params[item.key as keyof typeof params]} 
                            onChange={(e) => handleParamChange(item.key as any, parseFloat(e.target.value))} 
                            className={`w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer ${item.accent}`} 
                        />
                    </div>
                ))}
            </div>

            <div className="mt-12 p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Info className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    Adjusting parameters triggers real-time simulation across 1,000+ stochastic scenarios to find the optimal yield curve.
                </p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="glass-panel p-6 flex-1 border border-white/5 flex flex-col">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-lg">Simulation Output</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        {prevResult && (
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                COMPARISON ACTIVE
                            </div>
                        )}
                    </div>
                </div>

                {result ? (
                    <div className="flex-1 flex flex-col gap-8">
                        {/* Primary Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { t: "Predicted Yield", v: `${result.predicted_yield}T`, icon: TrendingUp, color: "text-emerald-400", prev: prevResult?.predicted_yield },
                                { t: "Estimated Cost", v: `₹${result.estimated_cost.toLocaleString()}`, icon: IndianRupee, color: "text-rose-400", prev: prevResult?.estimated_cost },
                                { t: "Efficiency Score", v: `${result.efficiency_score}%`, icon: ShieldCheck, color: "text-primary", prev: prevResult?.efficiency_score },
                                { t: "Risk Level", v: result.risk_level, icon: AlertTriangle, color: result.risk_level === 'High' ? "text-rose-500" : result.risk_level === 'Moderate' ? "text-warning" : "text-emerald-400" }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-2xl bg-white/5 border border-white/5 group relative overflow-hidden"
                                >
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-2">{item.t}</p>
                                    <div className="flex items-center justify-between">
                                        <h4 className={`text-xl font-black ${item.color} tracking-tight`}>{item.v}</h4>
                                        <item.icon className={`w-4 h-4 ${item.color} opacity-40`} />
                                    </div>
                                    {item.prev !== undefined && item.prev !== result.predicted_yield && (
                                        <div className="mt-2 flex items-center gap-1.5">
                                            <span className={`text-[9px] font-black ${(item.v.includes('₹') ? result.estimated_cost < item.prev : result.predicted_yield > item.prev) ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {(item.v.includes('₹') ? result.estimated_cost < item.prev : (typeof item.prev === 'number' && result.predicted_yield > item.prev)) ? '▲' : '▼'}
                                                {Math.abs(((typeof result.predicted_yield === 'number' ? result.predicted_yield : 0) - (typeof item.prev === 'number' ? item.prev : 0)) / (item.prev || 1) * 100).toFixed(1)}%
                                            </span>
                                            <span className="text-[9px] text-slate-600 font-bold uppercase">vs prev</span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Mid Section: Insight & Gauge */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            {/* AI Recommendation */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <BrainCircuit className="w-4 h-4 text-primary" /> AI Core Insight
                                </h4>
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 relative group h-full">
                                    <Sparkles className="absolute top-4 right-4 w-4 h-4 text-primary/30" />
                                    <p className="text-sm font-bold text-white mb-3 italic">"{result.ai_insight}"</p>
                                    <div className="h-px bg-primary/10 w-full mb-4"></div>
                                    <p className="text-xs font-medium text-slate-400 leading-relaxed">
                                        <span className="text-primary font-black uppercase text-[10px] mr-2">Recommendation:</span>
                                        {result.ai_recommendation}
                                    </p>
                                </div>
                            </div>

                            {/* Efficiency Gauge / Health Visualization */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-secondary" /> Performance Visualization
                                </h4>
                                <div className="glass-panel p-6 border border-white/5 flex-1 flex flex-col items-center justify-center relative">
                                    <div className="relative w-32 h-32">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                            <motion.circle 
                                                cx="64" cy="64" r="58" 
                                                stroke="currentColor" strokeWidth="8" fill="transparent" 
                                                strokeDasharray={364.4}
                                                initial={{ strokeDashoffset: 364.4 }}
                                                animate={{ strokeDashoffset: 364.4 - (364.4 * result.efficiency_score) / 100 }}
                                                className="text-primary"
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-black text-white">{result.efficiency_score}</span>
                                            <span className="text-[8px] font-black text-slate-500 uppercase">Efficiency</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-4 w-full justify-between">
                                        <div className="text-center flex-1">
                                            <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Impact</p>
                                            <div className={`h-1 rounded-full ${result.risk_level === 'Low' ? 'bg-emerald-500' : 'bg-warning'}`}></div>
                                        </div>
                                        <div className="text-center flex-1">
                                            <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Growth</p>
                                            <div className="h-1 rounded-full bg-primary"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comparative Flow */}
                        {prevResult && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-[10px] font-black text-slate-500 uppercase">Comparative Yield Flow</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-400">{prevResult.predicted_yield}T</span>
                                        <ArrowRight className="w-3 h-3 text-slate-600" />
                                        <span className="text-xs font-black text-white">{result.predicted_yield}T</span>
                                    </div>
                                </div>
                                <div className={`text-[10px] font-black ${result.predicted_yield > prevResult.predicted_yield ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {result.predicted_yield > prevResult.predicted_yield ? '+' : ''}{ (result.predicted_yield - prevResult.predicted_yield).toFixed(2) }T Variance
                                </div>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 grayscale">
                        <Loader2 className="w-12 h-12 mb-4 animate-spin" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Initializing AI Scenario Engine...</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
