import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Activity, 
  Thermometer, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Info,
  Layers,
  Clock,
  Compass,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeatherSoil: React.FC = () => {
  const [telemetry, setTelemetry] = useState({
     temperature: 27.2,
     prevTemp: 27.2,
     wind: 12.4,
     prevWind: 12.4,
     humidity: 45.1,
     prevHumidity: 45.1,
     uv: 8.2,
     rainfall: 1.2,
     nitrogen: 32.5,
     phosphorus: 45.0,
     potassium: 85.0,
     water: 22.0,
     ph: 6.8
  });

  const [history, setHistory] = useState<any[]>([]);

  // Simulation loop
  useEffect(() => {
     const interval = setInterval(() => {
        setTelemetry(prev => {
            const newTemp = prev.temperature + (Math.random() - 0.5) * 0.4;
            const newWind = Math.max(0, prev.wind + (Math.random() - 0.5) * 1.5);
            const newHumidity = Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 1.2));
            
            // Add to history for chart
            const newHistoryPoint = { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), temp: parseFloat(newTemp.toFixed(1)) };
            setHistory(h => [...h.slice(-14), newHistoryPoint]);

            return {
                ...prev,
                prevTemp: prev.temperature,
                temperature: parseFloat(newTemp.toFixed(1)),
                prevWind: prev.wind,
                wind: parseFloat(newWind.toFixed(1)),
                prevHumidity: prev.humidity,
                humidity: parseFloat(newHumidity.toFixed(1)),
                uv: Math.max(0, parseFloat((prev.uv + (Math.random() - 0.5) * 0.2).toFixed(1))),
                nitrogen: Math.max(0, parseFloat((prev.nitrogen + (Math.random() - 0.5) * 0.5).toFixed(1))),
                phosphorus: Math.max(0, parseFloat((prev.phosphorus + (Math.random() - 0.5) * 0.3).toFixed(1))),
                potassium: Math.max(0, parseFloat((prev.potassium + (Math.random() - 0.5) * 0.8).toFixed(1))),
                water: Math.max(0, Math.min(100, parseFloat((prev.water + (Math.random() - 0.5) * 0.4).toFixed(1)))),
            };
        });
     }, 4000);
     return () => clearInterval(interval);
  }, []);

  const getNPKStatus = (val: number, type: 'N' | 'P' | 'K') => {
    const ranges = { N: [40, 100], P: [30, 80], K: [80, 200] };
    const [low, high] = ranges[type];
    if (val < low) return { text: 'Deficient', color: 'rose', valColor: 'text-rose-400', bg: 'bg-rose-500', advice: `Increase ${type} input by 15%` };
    if (val > high) return { text: 'Excessive', color: 'rose', valColor: 'text-rose-400', bg: 'bg-rose-500', advice: `Reduce ${type} irrigation` };
    return { text: 'Optimal', color: 'emerald', valColor: 'text-emerald-400', bg: 'bg-emerald-500', advice: 'Levels stable' };
  };

  const nStatus = getNPKStatus(telemetry.nitrogen, 'N');
  const pStatus = getNPKStatus(telemetry.phosphorus, 'P');
  const kStatus = getNPKStatus(telemetry.potassium, 'K');

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1 flex items-center gap-3">
            <CloudRain className="w-8 h-8 text-secondary" />
            Weather & Soil Telemetry
          </h2>
          <p className="text-slate-400 text-sm font-medium">Real-time simulation-based environmental monitoring for precision agriculture.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 uppercase tracking-widest animate-pulse">
            <Activity className="w-3 h-3" />
            Live Simulation Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Climate Panel */}
         <div className="lg:col-span-8 glass-panel p-8 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-12">
               <div>
                  <h3 className="text-xl font-bold mb-1">Current Micro-Climate</h3>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <Compass className="w-3 h-3" /> PUNJAB REGION, SECTOR 4
                  </div>
               </div>
               <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <h2 className="text-6xl font-black tabular-nums tracking-tighter text-white">
                        {telemetry.temperature.toFixed(1)}°
                    </h2>
                    <div className="flex flex-col items-start">
                        <span className="text-2xl text-slate-500 font-bold leading-none">C</span>
                        <div className={`flex items-center text-[10px] font-bold ${telemetry.temperature >= telemetry.prevTemp ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {telemetry.temperature >= telemetry.prevTemp ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                            {Math.abs(telemetry.temperature - telemetry.prevTemp).toFixed(1)}°
                        </div>
                    </div>
                  </div>
                  <p className="text-secondary text-xs font-black uppercase tracking-widest">Clear Skies · Humidity {telemetry.humidity}%</p>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 mb-12">
               {[
                   { l: "Wind Speed", v: `${telemetry.wind} km/h`, i: Wind, c: "text-slate-400", t: telemetry.wind >= telemetry.prevWind ? "up" : "down" },
                   { l: "UV Index", v: telemetry.uv, i: Sun, c: "text-amber-400", t: "stable" },
                   { l: "Rainfall Est.", v: `${telemetry.rainfall}mm`, i: Droplets, c: "text-blue-400", t: "stable" },
                   { l: "Heat Stress", v: telemetry.temperature > 30 ? "Moderate" : "Low", i: Thermometer, c: "text-rose-400", t: telemetry.temperature > 30 ? "up" : "stable" }
               ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-2xl group hover:bg-white/10 transition-all">
                        <item.i className={`w-5 h-5 ${item.c} mb-3`} />
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.l}</p>
                        <p className="text-lg font-black text-white">{item.v}</p>
                    </div>
               ))}
            </div>

            {/* Mini Trend Chart */}
            <div className="mt-auto h-[180px] w-full relative z-10">
                <div className="absolute top-0 left-0 text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Temperature Trend (Live)
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area 
                            type="monotone" 
                            dataKey="temp" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            fill="url(#colorTemp)" 
                            animationDuration={1000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </div>

         {/* Soil Profile & AI Insight */}
         <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel p-8 border border-white/5 flex-1">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold">Simulated Soil Profile (NPK)</h3>
                    <Layers className="w-5 h-5 text-emerald-400/50" />
                </div>
                <div className="space-y-8">
                    {[
                        { l: "Nitrogen (N)", v: telemetry.nitrogen, s: nStatus, u: "mg/kg" },
                        { l: "Phosphorus (P)", v: telemetry.phosphorus, s: pStatus, u: "mg/kg" },
                        { l: "Potassium (K)", v: telemetry.potassium, s: kStatus, u: "mg/kg" }
                    ].map((item, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.l}</p>
                                    <p className={`text-xs font-black uppercase ${item.s.valColor}`}>{item.s.text}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-white tabular-nums">{item.v} <span className="text-[9px] text-slate-600 uppercase tracking-tighter">{item.u}</span></p>
                                </div>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                <motion.div 
                                    animate={{ width: `${Math.min(100, item.v)}%` }} 
                                    transition={{ duration: 1 }} 
                                    className={`${item.s.bg} h-full rounded-full`} 
                                />
                            </div>
                            <p className="text-[9px] text-slate-500 font-bold italic tracking-tight opacity-70 flex items-center gap-1.5">
                                <Sparkles className="w-2.5 h-2.5 text-emerald-400/40" /> AI Interpretation: {item.s.advice}
                            </p>
                        </div>
                    ))}
                    
                    <div className="pt-6 mt-2 border-t border-white/5 flex justify-between">
                        <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Moisture</p>
                            <p className="text-2xl font-black text-secondary tabular-nums">{telemetry.water}%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Soil pH</p>
                            <p className="text-2xl font-black text-white tabular-nums">
                                {telemetry.ph.toFixed(2)} <span className="text-[9px] font-bold text-slate-600 ml-1">NEUTRAL</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Environmental Insight Panel */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 border border-primary/20 bg-primary/5 relative group"
            >
                <div className="absolute top-4 right-4">
                    <Zap className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> AI Environmental Insight
                </h3>
                <p className="text-sm font-bold text-white leading-relaxed mb-4 italic">
                    "Current trends suggest a heat peak at 14:00. Soil moisture is adequate but will deplete rapidly. Pre-emptive irrigation recommended for Sector 4."
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                    <Info className="w-3.5 h-3.5" /> Actionable Strategy Identified
                    <ArrowRight className="w-3 h-3 ml-auto text-primary" />
                </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
};

export default WeatherSoil;
