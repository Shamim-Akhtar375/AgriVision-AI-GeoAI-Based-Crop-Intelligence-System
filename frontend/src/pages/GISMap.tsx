import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Polygon, FeatureGroup, useMap } from 'react-leaflet';

// Helper component to change map center dynamically when location changes
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

const locations = {
  punjab: {
    name: 'Ludhiana, Punjab',
    center: [30.9000, 75.8500] as [number, number],
    field: [
      [30.9040, 75.8450],
      [30.9050, 75.8550],
      [30.8950, 75.8550],
      [30.8950, 75.8450]
    ] as [number, number][],
    circles: [
      { center: [30.9029, 75.8504], color: '#f59e0b', radius: 150 },
      { center: [30.8980, 75.8420], color: '#ef4444', radius: 80 }
    ]
  },
  maharashtra: {
    name: 'Nashik, Maharashtra',
    center: [20.0059, 73.7925] as [number, number],
    field: [
      [20.0100, 73.7850],
      [20.0120, 73.8000],
      [19.9950, 73.8000],
      [19.9980, 73.7850]
    ] as [number, number][],
    circles: [
      { center: [20.0020, 73.7900], color: '#f59e0b', radius: 180 },
      { center: [20.0080, 73.7950], color: '#10b981', radius: 250 }
    ]
  },
  andhra: {
    name: 'Guntur, Andhra Pradesh',
    center: [16.3067, 80.4365] as [number, number],
    field: [
      [16.3100, 80.4300],
      [16.3120, 80.4450],
      [16.2950, 80.4450],
      [16.2980, 80.4300]
    ] as [number, number][],
    circles: [
      { center: [16.3050, 80.4350], color: '#ef4444', radius: 200 },
      { center: [16.3000, 80.4400], color: '#f59e0b', radius: 120 }
    ]
  }
};

const GISMap: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<keyof typeof locations>('punjab');
  const locData = locations[activeLocation];

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold mb-1">GIS Visualization</h2>
           <p className="text-slate-400 text-sm">Advanced field-level geospatial analytics and NDVI overlays.</p>
        </div>
        <div className="flex gap-2">
            <select 
              value={activeLocation}
              onChange={(e) => setActiveLocation(e.target.value as keyof typeof locations)}
              className="bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 outline-none cursor-pointer hover:bg-slate-700 transition"
            >
              {Object.entries(locations).map(([key, loc]) => (
                <option key={key} value={key}>{loc.name} Farm</option>
              ))}
            </select>
            <select className="bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 outline-none">
              <option>NDVI (Vegetation Index)</option>
              <option>NDWI (Water Index)</option>
              <option>EVI (Enhanced Vegetation Index)</option>
            </select>
        </div>
      </div>
      
      <div className="flex-1 glass-panel p-2 relative overflow-hidden rounded-2xl">
         <div className="absolute top-6 right-6 z-[1000] bg-surface/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl">
             <h4 className="text-sm font-semibold mb-2">Legend</h4>
             <div className="space-y-2 text-xs">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Healthy Canopy</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-sm"></div> Moderate Stress</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-sm"></div> Severe Stress</div>
             </div>
         </div>
         <MapContainer center={locData.center} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '12px' }}>
            <ChangeView center={locData.center} />
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <FeatureGroup>
               <Polygon positions={locData.field} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.3 }} />
            </FeatureGroup>
            {locData.circles.map((c, i) => (
               <Circle key={i} center={c.center as [number, number]} pathOptions={{ color: c.color, fillColor: c.color, fillOpacity: 0.5 }} radius={c.radius} />
            ))}
         </MapContainer>
      </div>
    </div>
  );
};

export default GISMap;
