import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Activity, 
  Cpu, 
  Database, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Info,
  Droplet,
  Thermometer,
  Zap,
  BarChart3,
  Gauge,
  Layers,
  HelpCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AIInsights: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Simulation Data
  const [insightData, setInsightData] = useState([
    { step: '01', yield: 4200, impact: 65 },
    { step: '05', yield: 4500, impact: 70 },
    { step: '10', yield: 4800, impact: 68 },
    { step: '15', yield: 5100, impact: 75 },
    { step: '20', yield: 5400, impact: 82 },
    { step: '25', yield: 5200, impact: 88 },
    { step: '30', yield: 5600, impact: 85 },
  ]);

  const [metrics, setMetrics] = useState({
    confidence: '92.4%',
    variability: '±0.12',
    latency: '45ms',
    samples: '50,240'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setMetrics(prev => ({
          ...prev,
          confidence: (90 + Math.random() * 5).toFixed(1) + '%',
          variability: '±' + (0.1 + Math.random() * 0.05).toFixed(2),
          latency: (40 + Math.random() * 10).toFixed(0) + 'ms'
        }));
        setIsProcessing(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header with Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">AI Analytics & Decision Insights</h2>
          <p className="text-slate-400 text-sm font-medium">Simulation-based AI analysis for smart farming decisions</p>
        </div>
        <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
                {isProcessing ? (
                    <motion.div 
                        key="processing"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center gap-2 text-[10px] font-black text-warning bg-warning/10 px-3 py-1.5 rounded-full border border-warning/20 uppercase tracking-widest"
                    >
                        <Clock className="w-3 h-3 animate-spin" /> ⏳ Processing...
                    </motion.div>
                ) : (
                    <motion.div 
                        key="active"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest"
                    >
                        <ShieldCheck className="w-3 h-3" /> 🟢 AI Analysis Active
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { t: "AI Confidence Score", v: metrics.confidence, i: Gauge, c: "text-emerald-400", tip: "Probability that simulated outcomes match historical patterns." },
            { t: "Prediction Variability", v: metrics.variability, i: Activity, c: "text-rose-400", tip: "Expected deviation range in yield output." },
            { t: "Simulation Latency", v: metrics.latency, i: Cpu, c: "text-secondary", tip: "Time taken to run 1000 parallel scenarios." },
            { t: "Data Samples Simulated", v: metrics.samples, i: Database, c: "text-cyan", tip: "Number of environmental data points used in current run." }
        ].map((item, idx) => (
            <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-panel p-5 relative overflow-hidden group border border-white/5"
            >
                <div className="flex items-start justify-between relative z-10">
                    <div className={`p-3 rounded-xl bg-white/5 ${item.c}`}>
                        <item.i className="w-5 h-5" />
                    </div>
                    <div className="group/tip relative">
                        <HelpCircle className="w-3 h-3 text-slate-600 cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-900 border border-white/10 rounded-lg text-[10px] text-slate-400 opacity-0 group-hover/tip:opacity-100 transition-opacity z-[100] pointer-events-none shadow-2xl backdrop-blur-xl">
                            {item.tip}
                        </div>
                    </div>
                </div>
                <div className="mt-4 relative z-10">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{item.t}</p>
                    <div className="flex items-end gap-2">
                        <p className="text-2xl font-black text-white leading-none">{item.v}</p>
                        <span className="text-[10px] font-bold text-emerald-400/70 mb-0.5">▲ 1.2%</span>
                    </div>
                </div>
                {/* Background Decor */}
                <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 bg-current ${item.c}`}></div>
            </motion.div>
        ))}
      </div>

      {/* Main Analysis Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass-panel p-6 relative overflow-hidden"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        Yield Prediction Trend Analysis
                        <Zap className="w-4 h-4 text-warning" />
                    </h3>
                    <p className="text-xs text-slate-400">Projected output vs Environmental Impact factor</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Yield</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Impact</span>
                    </div>
                </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={insightData}>
                        <defs>
                            <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="step" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Simulation Steps', position: 'insideBottom', offset: -5, fontSize: 9, fill: '#475569' }} />
                        <YAxis yAxisId="left" stroke="#10b981" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                            itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                        />
                        <Area 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="yield" 
                            stroke="#10b981" 
                            strokeWidth={3} 
                            fill="url(#colorYield)" 
                            name="Predicted Yield"
                            animationDuration={2500}
                        />
                        <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="impact" 
                            stroke="#f43f5e" 
                            strokeWidth={2} 
                            strokeDasharray="5 5"
                            dot={{ r: 3, fill: '#f43f5e' }}
                            name="Impact Factor"
                            animationDuration={2500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>

        {/* AI-Generated Insights Panel */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 flex flex-col"
        >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                AI-Generated Insights
                <BarChart3 className="w-5 h-5 text-primary" />
            </h3>
            
            <div className="space-y-4 flex-1">
                {[
                    { t: "Soil Health Insight", m: "AI analysis indicates gradual nutrient depletion. Targeted fertilization is recommended.", i: Sprout, c: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { t: "Irrigation Optimization", m: "AI suggests adjusting irrigation timing based on current moisture conditions.", i: Droplet, c: "text-secondary", bg: "bg-secondary/10" },
                    { t: "Yield Trend Insight", m: "Yield growth is stabilizing. Optimization strategies may improve output.", i: TrendingUp, c: "text-warning", bg: "bg-warning/10" },
                    { t: "Thermal Risk Alert", m: "High temperature trends may impact crop health in northern sectors.", i: Thermometer, c: "text-rose-400", bg: "bg-rose-500/10" }
                ].map((insight, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="p-4 rounded-xl border border-white/5 bg-white/5 flex gap-4 group cursor-default"
                    >
                        <div className={`p-2 h-fit rounded-lg ${insight.bg} ${insight.c}`}>
                            <insight.i className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className={`text-xs font-black uppercase tracking-widest mb-1 ${insight.c}`}>{insight.t}</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium group-hover:text-slate-200 transition-colors">{insight.m}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </div>

      {/* Explainable AI Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-panel p-6 border border-white/5"
      >
        <div className="flex items-center gap-2 mb-6">
            <h3 className="text-xl font-bold">Why this recommendation?</h3>
            <Info className="w-4 h-4 text-slate-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { l: "Low soil moisture detected", p: 78, c: "text-secondary", desc: "Current sensor telemetry shows moisture levels dropped below 30% threshold." },
                { l: "High temperature trend", p: 62, c: "text-rose-400", desc: "Aggregated forecast data indicates a sustained heatwave period." },
                { l: "Historical yield variation", p: 45, c: "text-warning", desc: "Pattern matching with last 3 years of harvest data suggests sector stress." }
            ].map((fact, i) => (
                <div key={i} className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-slate-300 uppercase tracking-tight">{fact.l}</span>
                        <span className={`text-xs font-black ${fact.c}`}>{fact.p}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${fact.p}%` }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className={`h-full bg-current ${fact.c}`}
                        />
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{fact.desc}</p>
                </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

// Simple Sprout icon if not imported
const Sprout = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 20h10" />
    <path d="M10 20c5.5-3 5.5-13 0-16" />
    <path d="M14 20c-5.5-3-5.5-13 0-16" />
    <path d="M12 20v-4" />
  </svg>
);

export default AIInsights;
