import React from 'react';
import { motion } from 'framer-motion';
import { User, Database, MemoryStick, Save } from 'lucide-react';

const Settings: React.FC = () => {
    return (
        <div className="max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-bold mb-1">Global Settings</h2>
                  <p className="text-slate-400 text-sm">Manage your preferences, integrations, and API keys.</p>
               </div>
               <button className="bg-primary hover:bg-emerald-400 text-white px-5 py-2 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center gap-2 text-sm">
                 <Save className="w-4 h-4"/>
                 Save Changes
               </button>
            </div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><User className="w-5 h-5 text-primary"/> Profile & Display</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Full Name</label>
                        <input type="text" defaultValue="Alex Farmer" className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email Address</label>
                        <input type="email" defaultValue="alex@agrivision.ai" className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Default Currency</label>
                        <select className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all">
                           <option>INR (₹)</option>
                           <option>USD ($)</option>
                           <option>EUR (€)</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><Database className="w-5 h-5 text-secondary"/> Field Configurations & AI Parameters</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 flex-shrink-0 bg-white/10 rounded-lg p-1">
                               <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Openweather_logo.png" alt="OWM" className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-slate-200">OpenWeatherMap API</h4>
                                <p className="text-xs text-slate-400 mt-0.5">Auto-fetching climate telemetry for models.</p>
                            </div>
                        </div>
                        <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">Active / Connected</button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-rose-500/20 text-rose-500 flex items-center justify-center p-1">
                               <MemoryStick className="w-6 h-6"/>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-slate-200">Local IoT Soil Sensors</h4>
                                <p className="text-xs text-slate-400 mt-0.5">Live N-P-K & Soil Moisture Data Injection Sync.</p>
                            </div>
                        </div>
                        <button className="text-xs font-semibold px-4 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all text-white">Configure Endpoint</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
