import React, { useState, useEffect, useCallback } from 'react';
import { Bell, Search, User, MapPin, Activity, AlertTriangle, TrendingUp, IndianRupee, ShieldCheck } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { navigateToSection } = useSearch();

  const suggestions = [
    { id: 'yield-section', title: 'Crop Yield Prediction', keywords: ['yield', 'prediction', 'crop'], icon: TrendingUp },
    { id: 'moisture-section', title: 'Soil Moisture', keywords: ['moisture', 'soil', 'water'], icon: Activity },
    { id: 'savings-section', title: 'Cost Optimization', keywords: ['cost', 'savings', 'optimized'], icon: IndianRupee },
    { id: 'map-section', title: 'Field Health Map', keywords: ['map', 'health', 'ndvi'], icon: MapPin },
    { id: 'alerts-section', title: 'AI Alerts', keywords: ['alerts', 'smart', 'warnings'], icon: AlertTriangle },
    { id: 'health-section', title: 'Crop Health Index', keywords: ['health', 'index', 'shield'], icon: ShieldCheck },
  ];

  const filteredSuggestions = suggestions.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) || 
    s.keywords.some(k => k.includes(query.toLowerCase()))
  );

  const handleSelect = (id: string) => {
    navigateToSection(id);
    setQuery('');
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredSuggestions.length > 0) {
      handleSelect(filteredSuggestions[0].id);
    }
  };

  return (
    <header className="h-20 px-8 flex items-center justify-between glass-panel border-b-0 border-x-0 border-t-0 rounded-none z-50 relative">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-[500px]">
          <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
            <Search className={`w-4 h-4 absolute left-5 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-slate-400'}`} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={handleKeyDown}
              placeholder="Search fields, metrics, or insights..." 
              className={`w-full bg-slate-800/40 border ${isFocused ? 'border-primary/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-white/5'} rounded-full pl-12 pr-6 py-3 text-sm outline-none transition-all duration-300 placeholder:text-slate-500 font-medium`}
            />
          </div>
          
          <AnimatePresence>
            {isFocused && query.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-3 bg-surface/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden backdrop-blur-xl z-[100]"
              >
                <div className="p-2">
                   {filteredSuggestions.length > 0 ? (
                     <>
                       <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Suggestions</div>
                       {filteredSuggestions.map((result, i) => (
                         <div 
                           key={i} 
                           className="px-4 py-3 hover:bg-primary/10 cursor-pointer flex items-center gap-4 rounded-xl transition-all duration-200 group" 
                           onClick={() => handleSelect(result.id)}
                         >
                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-primary transition-colors">
                               <result.icon className="w-4 h-4" />
                            </div>
                            <div>
                               <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{result.title}</p>
                               <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Navigate to Section</p>
                            </div>
                         </div>
                       ))}
                     </>
                   ) : (
                     <div className="px-4 py-8 text-sm text-slate-400 text-center flex flex-col items-center gap-3">
                        <div className="p-3 bg-rose-500/10 rounded-full text-rose-400">
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-200">No exact match found</p>
                          <p className="text-xs text-slate-500 mt-1">Showing closest insights for your farm...</p>
                        </div>
                     </div>
                   )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer relative">
          <Bell className="w-5 h-5 text-slate-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border border-surface"></span>
        </div>
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-cyan flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-all border border-white/10 overflow-hidden">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="hidden md:block">
            <h3 className="text-sm font-bold text-white">Alex Farmer</h3>
            <p className="text-[10px] font-black text-primary uppercase">Premium Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
