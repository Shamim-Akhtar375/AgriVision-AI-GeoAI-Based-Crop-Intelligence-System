import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplet, 
  Leaf, 
  TrendingUp, 
  IndianRupee, 
  Zap, 
  AlertTriangle, 
  Search, 
  Bell, 
  User,
  Activity,
  ShieldCheck,
  ChevronDown,
  Layers,
  Clock,
  Globe,
  Map as MapIcon,
  Thermometer,
  CloudRain,
  Navigation
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';
import { MapContainer, TileLayer, Circle, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSearch } from '../context/SearchContext';

// --- Mock Data ---
const initialYieldData = [
  { month: 'Apr', predicted: 2200, actual: 2100 },
  { month: 'May', predicted: 2800, actual: 2600 },
  { month: 'Jun', predicted: 3400, actual: 3200 },
  { month: 'Jul', predicted: 3900, actual: 4100 },
  { month: 'Aug', predicted: 4200, actual: 4000 },
  { month: 'Sep', predicted: 4800, actual: 4600 },
  { month: 'Oct', predicted: 5100, actual: 5300 },
];

const costData = [
  { category: 'Fertilizer', current: 4500, optimized: 3200 },
  { category: 'Water', current: 3200, optimized: 1800 },
  { category: 'Pesticide', current: 2800, optimized: 1200 },
  { category: 'Labor', current: 5000, optimized: 4800 },
];

// --- Components ---

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-panel p-6 relative overflow-hidden group h-full"
  >
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 bg-${color}`}></div>
    <div className="flex items-start justify-between z-10 relative">
      <div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 text-${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-4 z-10 relative">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
        {trend === 'up' ? '▲' : '▼'} {trendValue}%
      </span>
      <span className="text-[10px] text-slate-500 uppercase font-medium">vs last cycle</span>
    </div>
  </motion.div>
);

const AlertCard = ({ type, title, message, delay }: any) => {
  const styles: any = {
    weather: { color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/5', icon: AlertTriangle },
    nutrient: { color: 'text-warning', border: 'border-warning/30', bg: 'bg-warning/5', icon: Activity },
    cost: { color: 'text-cyan', border: 'border-cyan/30', bg: 'bg-cyan/5', icon: IndianRupee },
  };
  const s = styles[type] || styles.cost;
  const Icon = s.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`p-4 rounded-xl border ${s.border} ${s.bg} flex gap-4 items-start relative group overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}></div>
      <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${s.color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h4 className={`text-sm font-bold ${s.color} mb-1`}>{title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
};

const MapInteractiveHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
};

// --- Main Dashboard ---

const Dashboard: React.FC = () => {
  const { activeSection } = useSearch();
  const [isSimulating, setIsSimulating] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [yieldData, setYieldData] = useState(initialYieldData);
  const [timeFilter, setTimeFilter] = useState('Last 7 Days');
  const [layers, setLayers] = useState({ ndvi: true, moisture: false, temp: false });
  const [opacities, setOpacities] = useState({ ndvi: 0.4, moisture: 0.4, temp: 0.4 });

  const [stats, setStats] = useState({
    yield: '8.4k Tons',
    moisture: '42%',
    savings: '₹12,450',
    health: '94/100',
    alerts: [
      { type: 'weather', title: 'Drought Risk Potential', message: 'High temperatures expected. AI recommends increasing irrigation.' },
      { type: 'nutrient', title: 'Nutrient Deficiency', message: 'AI analysis indicates possible nutrient stress in selected zones.' },
      { type: 'cost', title: 'Cost Savings Opportunity', message: 'Optimized input usage can reduce overall farming costs.' }
    ]
  });

  const [mapCircles, setMapCircles] = useState([
    { center: [30.9010, 75.8573] as [number, number], color: '#10b981', radius: 1000 },
    { center: [30.8900, 75.8400] as [number, number], color: '#ef4444', radius: 500 },
    { center: [30.9100, 75.8700] as [number, number], color: '#f59e0b', radius: 700 }
  ]);

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStats({
      yield: (8 + Math.random() * 2).toFixed(1) + 'k Tons',
      moisture: Math.floor(35 + Math.random() * 20) + '%',
      savings: '₹' + Math.floor(11000 + Math.random() * 3000).toLocaleString(),
      health: Math.floor(90 + Math.random() * 10) + '/100',
      alerts: [
        { type: 'weather', title: 'Drought Risk Potential', message: `Temperature peak at ${ (28 + Math.random()*5).toFixed(1) }°C detected. Increasing irrigation by 12%.` },
        { type: 'nutrient', title: 'Zone A-4 Deficiency', message: 'Simulated scans suggest phosphorus boost in northern sector.' },
        { type: 'cost', title: 'Input Optimization', message: 'Energy cost reduction achieved via peak-hour pumping adjustment.' }
      ]
    });

    setYieldData(prev => prev.map(d => ({
      ...d,
      predicted: Math.round(d.predicted * (0.95 + Math.random() * 0.1))
    })));

    setIsSimulating(false);
  };

  const handleMapClick = async (lat: number, lng: number) => {
    setIsMapLoading(true);
    setSelectedZone(null);

    try {
      const response = await fetch('/api/v1/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: lat, longitude: lng })
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();

      const color = data.health_score > 80 ? '#10b981' : data.health_score > 60 ? '#f59e0b' : '#ef4444';
      
      // Generate a grid of points for "Geospatial Analysis" feel
      const newCircles: any[] = [];
      const offset = 0.0015;
      for(let i=-1; i<=1; i++) {
        for(let j=-1; j<=1; j++) {
            const variator = Math.random() * 10;
            const finalColor = (data.health_score + variator) > 80 ? '#10b981' : (data.health_score + variator) > 60 ? '#f59e0b' : '#ef4444';
            newCircles.push({
                center: [lat + i*offset, lng + j*offset] as [number, number],
                color: finalColor,
                radius: 350 + Math.random() * 100
            });
        }
      }

      setMapCircles(prev => [...prev, ...newCircles]);
      setSelectedZone({ ...data, lat, lng });
    } catch (error) {
      console.error("Map Simulation Error:", error);
      const fallback = {
        health_score: 85,
        soil_moisture: 45,
        temperature: 28,
        rainfall: 120,
        predicted_yield: 5.2,
        ai_insight: "Simulation offline. Using cached NDVI telemetry for this sector."
      };
      setSelectedZone({ ...fallback, lat, lng });
    } finally {
      setIsMapLoading(false);
    }
  };

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Farm Overview</h2>
          <p className="text-slate-400 text-sm font-medium">Simulation-based AI insights for smart farming decisions</p>
        </div>
        <button 
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="flex items-center gap-3 bg-primary hover:bg-emerald-400 disabled:opacity-50 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/25 group active:scale-95"
        >
          <Zap className={`w-5 h-5 transition-transform group-hover:scale-125 ${isSimulating ? 'animate-spin' : ''}`} />
          {isSimulating ? 'SIMULATING...' : 'RUN AI SIMULATION'}
        </button>
      </div>

      {/* Top Stats Overview (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div id="yield-section" className={`transition-all duration-500 rounded-2xl ${activeSection === 'yield-section' ? 'ring-2 ring-primary shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-[1.02]' : ''}`}>
          <StatCard title="Estimated Crop Yield" value={stats.yield} icon={TrendingUp} trend="up" trendValue="12.5" color="primary" delay={0.1} />
        </div>
        <div id="moisture-section" className={`transition-all duration-500 rounded-2xl ${activeSection === 'moisture-section' ? 'ring-2 ring-secondary shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-[1.02]' : ''}`}>
          <StatCard title="Soil Moisture Average" value={stats.moisture} icon={Droplet} trend="down" trendValue="3.2" color="secondary" delay={0.2} />
        </div>
        <div id="savings-section" className={`transition-all duration-500 rounded-2xl ${activeSection === 'savings-section' ? 'ring-2 ring-cyan shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-[1.02]' : ''}`}>
          <StatCard title="Projected Cost Savings" value={stats.savings} icon={IndianRupee} trend="up" trendValue="18.1" color="cyan" delay={0.3} />
        </div>
        <div id="health-section" className={`transition-all duration-500 rounded-2xl ${activeSection === 'health-section' ? 'ring-2 ring-warning shadow-[0_0_30px_rgba(245,158,11,0.3)] scale-[1.02]' : ''}`}>
          <StatCard title="Crop Health Index" value={stats.health} icon={ShieldCheck} trend="up" trendValue="2.4" color="warning" delay={0.4} />
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Yield Prediction Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`glass-panel p-6 lg:col-span-2 relative group transition-all duration-500 ${activeSection === 'yield-section' ? 'ring-2 ring-primary shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-[1.01]' : ''}`}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                Yield Prediction
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </h3>
              <p className="text-xs text-slate-400">AI-Based Yield Simulation (Real-Time)</p>
            </div>
            <button className="flex items-center gap-2 bg-surface-lighter border border-white/5 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all">
              Last 6 Months <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData}>
                <defs>
                  <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: '600' }}
                />
                <Legend iconType="circle" verticalAlign="bottom" wrapperStyle={{ paddingTop: '30px', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }} />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorPred)" 
                  name="AI Simulated Prediction" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorHist)" 
                  name="Historical Yield Trend" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Smart Alerts Panel */}
        <motion.div 
          id="alerts-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`glass-panel p-6 flex flex-col transition-all duration-500 ${activeSection === 'alerts-section' ? 'ring-2 ring-primary shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-[1.01]' : ''}`}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">AI Smart Alerts</h3>
            <span className="bg-primary/20 text-primary text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">3 New</span>
          </div>
          <div className="space-y-4 flex-1">
            {stats.alerts.map((alert, i) => (
              <AlertCard key={i} {...alert} delay={0.7 + i * 0.1} />
            ))}
          </div>
          <button className="mt-6 w-full py-3 rounded-xl bg-surface-lighter/50 border border-white/5 text-xs font-bold text-slate-400 hover:text-white hover:bg-surface-lighter transition-all">
            VIEW ALL INSIGHTS
          </button>
        </motion.div>

      </div>

      {/* Enhanced GIS Section */}
      <div id="map-section" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-3">
              GIS Visualization / Field Health Map
              {isMapLoading ? (
                <span className="flex items-center gap-2 text-xs font-bold text-warning animate-pulse">
                   <Clock className="w-3 h-3" /> UPDATING SIMULATION...
                </span>
              ) : (
                <span className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-tighter">
                  🟢 AI Simulation Active
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-medium opacity-60">Real-Time Geospatial Analysis (Simulated)</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-surface-lighter/50 rounded-xl p-1 border border-white/5">
                {['Last 7 Days', 'Monthly'].map(opt => (
                    <button 
                        key={opt}
                        onClick={() => setTimeFilter(opt)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${timeFilter === opt ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-3 glass-panel overflow-hidden relative min-h-[550px] flex flex-col group"
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 z-[1000] flex gap-2">
                <div className="bg-surface/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 flex flex-col gap-3 shadow-2xl">
                    <div className="flex flex-col gap-1">
                        <p className="text-[8px] font-black text-slate-500 uppercase px-1 mb-1">Layers</p>
                        <button onClick={() => toggleLayer('ndvi')} className={`p-2 rounded-lg transition-all ${layers.ndvi ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-500 hover:bg-white/5'}`} title="NDVI Layer">
                            <Leaf className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleLayer('moisture')} className={`p-2 rounded-lg transition-all ${layers.moisture ? 'bg-secondary/20 text-secondary border border-secondary/30' : 'text-slate-500 hover:bg-white/5'}`} title="Moisture Layer">
                            <Droplet className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleLayer('temp')} className={`p-2 rounded-lg transition-all ${layers.temp ? 'bg-warning/20 text-warning border border-warning/30' : 'text-slate-500 hover:bg-white/5'}`} title="Temp Layer">
                            <Thermometer className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 relative bg-[#0B0F1A]">
              <MapContainer 
                center={[30.9010, 75.8573]} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <MapInteractiveHandler onMapClick={handleMapClick} />
                
                {layers.ndvi && mapCircles.map((circle, idx) => (
                  <Circle 
                    key={`ndvi-${idx}`} 
                    center={circle.center} 
                    pathOptions={{ 
                      color: circle.color, 
                      fillColor: circle.color, 
                      fillOpacity: opacities.ndvi,
                      weight: 1,
                      className: 'transition-all duration-1000'
                    }} 
                    radius={circle.radius} 
                  />
                ))}

                {selectedZone && (
                  <Popup position={[selectedZone.lat, selectedZone.lng]}>
                    <div className="min-w-[220px] bg-slate-950 text-white p-4 rounded-2xl border border-white/10 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                            <span className="text-[10px] font-black text-primary flex items-center gap-1">
                                <Activity className="w-3 h-3" /> FIELD STATUS
                            </span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${selectedZone.health_score > 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                {selectedZone.health_score > 70 ? 'OPTIMAL' : 'MONITOR'}
                            </span>
                        </div>
                        <p className="text-xs font-medium mb-3 text-slate-300 italic">"AI Recommendation: {selectedZone.ai_insight.length > 60 ? selectedZone.ai_insight.substring(0, 60) + '...' : selectedZone.ai_insight}"</p>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Actionable Advice</p>
                            <p className="text-[11px] font-bold text-white">Recommended {selectedZone.health_score > 75 ? 'standard maintenance' : 'immediate nitrogen treatment'} for this sector.</p>
                        </div>
                    </div>
                  </Popup>
                )}
              </MapContainer>

              <div className="absolute bottom-6 left-6 z-[1000] glass-panel p-4 py-3 flex flex-col gap-2 min-w-[200px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vegetation Index (NDVI)</p>
                <div className="flex flex-col gap-1.5">
                    <div className="h-2 w-full bg-gradient-to-r from-rose-500 via-yellow-500 to-emerald-500 rounded-full"></div>
                    <div className="flex justify-between text-[9px] font-bold text-slate-500">
                        <span>STRESS</span>
                        <span>MODERATE</span>
                        <span>HEALTHY</span>
                    </div>
                </div>
              </div>

              {isMapLoading && (
                <div className="absolute inset-0 z-[2000] bg-slate-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                        <div className="w-20 h-20 border-2 border-primary/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-b-2 border-primary rounded-full animate-spin"></div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="text-lg font-black text-white tracking-widest uppercase">Geospatial Processing</h4>
                        <p className="text-slate-400 text-xs font-medium mt-1">Cross-referencing satellite telemetry with soil sensors</p>
                    </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Insight Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-panel p-6 flex-1 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe className="w-24 h-24 text-primary" />
                </div>
                
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-primary" />
                    Selected Area Insights
                </h3>

                {selectedZone ? (
                    <div className="space-y-5 flex-1">
                        <div className="space-y-1.5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">📍 Location</p>
                            <p className="text-sm font-bold text-white truncate">{selectedZone.lat.toFixed(4)}°N, {selectedZone.lng.toFixed(4)}°E</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase">Crop Health</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-black text-white">{selectedZone.health_score}</span>
                                    <span className="text-[10px] font-bold text-primary">/100</span>
                                </div>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[9px] font-black text-slate-500 uppercase">Yield Pot.</p>
                                <div className="flex items-center justify-end gap-1">
                                    <span className="text-lg font-black text-white">{selectedZone.predicted_yield}</span>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase">Tons/H</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full"></div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
                                        <Droplet className="w-3.5 h-3.5" />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-300">Soil Moisture</p>
                                </div>
                                <p className="text-sm font-black text-white">{selectedZone.soil_moisture}%</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-warning/10 text-warning border border-warning/20">
                                        <Thermometer className="w-3.5 h-3.5" />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-300">Temperature</p>
                                </div>
                                <p className="text-sm font-black text-white">{selectedZone.temperature}°C</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-cyan/10 text-cyan border border-cyan/20">
                                        <CloudRain className="w-3.5 h-3.5" />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-300">Daily Rainfall</p>
                                </div>
                                <p className="text-sm font-black text-white">{selectedZone.rainfall}mm</p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 relative group/insight">
                            <div className="absolute top-2 right-2">
                                <Activity className="w-3 h-3 text-primary/40 animate-pulse" />
                            </div>
                            <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1.5">🤖 AI Core Insight</p>
                            <p className="text-[11px] leading-relaxed text-slate-300 font-medium italic">
                                "{selectedZone.ai_insight}"
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 grayscale">
                        <MapIcon className="w-12 h-12 mb-4" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Select a map sector<br/>to begin analysis</p>
                    </div>
                )}

                <div className="mt-6 pt-4 border-t border-white/5">
                    <p className="text-[8px] font-bold text-slate-600 uppercase text-center leading-tight">Data Integrity: Verified by AgriVision Hybrid AI<br/>Model v4.2 Geostationary Link</p>
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cost Optimization Overview */}
      <motion.div 
        id="savings-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className={`glass-panel p-6 transition-all duration-500 ${activeSection === 'savings-section' ? 'ring-2 ring-primary shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-[1.01]' : ''}`}
      >
        <div className="mb-10">
          <h3 className="text-xl font-bold">Cost Optimization Overview</h3>
          <p className="text-xs text-slate-400 mt-0.5">Current Spending vs AI Recommended Plan</p>
        </div>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costData} barGap={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="category" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
              />
              <Legend iconType="rect" verticalAlign="bottom" wrapperStyle={{ paddingTop: '30px', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }} />
              <Bar dataKey="current" name="Current Cost (₹)" fill="#1e293b" radius={[6, 6, 0, 0]} barSize={28} />
              <Bar dataKey="optimized" name="AI Recommended Cost (₹)" fill="#10b981" radius={[6, 6, 0, 0]} barSize={28}>
                {costData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 2 ? '#10b981' : '#10b981cc'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
