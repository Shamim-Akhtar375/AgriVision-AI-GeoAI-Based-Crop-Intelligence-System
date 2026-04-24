import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import GISMap from './pages/GISMap';
import AIInsights from './pages/AIInsights';
import Simulator from './pages/Simulator';
import CropHealth from './pages/CropHealth';
import WeatherSoil from './pages/WeatherSoil';
import Settings from './pages/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background/50 p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'map' && <GISMap />}
          {activeTab === 'ai-insights' && <AIInsights />}
          {activeTab === 'simulator' && <Simulator />}
          {activeTab === 'crop-health' && <CropHealth />}
          {activeTab === 'weather' && <WeatherSoil />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default App;
