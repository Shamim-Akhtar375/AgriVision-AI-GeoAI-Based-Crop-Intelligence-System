import React from 'react';
import { LayoutDashboard, Map, Settings, Beaker, Sprout, BarChart3, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ai-insights', label: 'AI Insights', icon: BarChart3 },
  { id: 'simulator', label: 'Scenario Simulator', icon: Beaker },
  { id: 'crop-health', label: 'Crop Health', icon: Sprout },
  { id: 'weather', label: 'Weather & Soil', icon: CloudRain },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 h-full bg-surface border-r border-white/5 flex flex-col transition-all duration-300 z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center shadow-lg shadow-primary/20">
          <Sprout className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          AgriVision <span className="text-primary text-sm">AI</span>
        </h1>
      </div>

      <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group",
                isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={clsx("w-5 h-5 z-10 transition-colors", isActive ? "text-primary" : "text-slate-400 group-hover:text-primary/70")} />
              <span className="font-medium z-10">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={() => setActiveTab('settings')}
          className={clsx(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group",
            activeTab === 'settings' ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          )}
        >
          {activeTab === 'settings' && (
            <motion.div
              layoutId="active-nav"
              className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Settings className={clsx("w-5 h-5 z-10 transition-colors", activeTab === 'settings' ? "text-primary" : "text-slate-400 group-hover:text-primary/70")} />
          <span className="font-medium z-10">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
