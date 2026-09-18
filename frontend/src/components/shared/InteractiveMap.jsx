// src/components/shared/InteractiveMap.jsx
import React, { useState } from 'react';
import { MapPin, Layers, Maximize2, Compass, Navigation, Droplets, Info } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const InteractiveMap = ({
  fieldName = "Field Plot Sector-A",
  location = "Khargone, Madhya Pradesh",
  gps = "21.8234° N, 75.6189° E",
  areaHa = 2.4,
  soilType = "Medium Deep Black Clay (Vertisol)",
  irrigation = "Solar Drip Fertigation",
  className = ''
}) => {
  const [mapLayer, setMapLayer] = useState('satellite'); // satellite | topographic | soil
  const [showCoordinates, setShowCoordinates] = useState(true);

  return (
    <div className={`relative rounded-xl overflow-hidden border border-slate-200/90 bg-slate-900 text-white shadow-xs ${className}`}>
      {/* Visual Canvas / Simulated Field Satellite Mesh */}
      <div className="relative w-full h-64 sm:h-80 bg-slate-950 overflow-hidden flex items-center justify-center select-none">
        {/* SVG Geological & Satellite Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.8" />
            </pattern>
            <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#475569" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {mapLayer === 'topographic' && (
            <>
              {/* Contour elevation lines */}
              <ellipse cx="50%" cy="50%" rx="35%" ry="25%" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <ellipse cx="50%" cy="50%" rx="25%" ry="18%" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.8" />
              <ellipse cx="50%" cy="50%" rx="15%" ry="10%" fill="none" stroke="#10b981" strokeWidth="1.2" />
            </>
          )}
        </svg>

        {/* Textured Field Surface Visual */}
        <div
          className={`absolute inset-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
            mapLayer === 'satellite'
              ? 'border-emerald-500/80 bg-emerald-950/40'
              : mapLayer === 'soil'
              ? 'border-amber-500/80 bg-amber-950/40'
              : 'border-blue-500/80 bg-slate-900/60'
          }`}
        >
          {/* Simulated Geofenced Polygon Boundary */}
          <svg className="w-full h-full p-4 overflow-visible" viewBox="0 0 400 200">
            {/* Field Boundary Polygon */}
            <polygon
              points="60,40 340,30 310,160 90,170"
              fill={mapLayer === 'soil' ? "rgba(217, 119, 6, 0.25)" : "rgba(16, 185, 129, 0.2)"}
              stroke={mapLayer === 'soil' ? "#d97706" : "#10b981"}
              strokeWidth="2.5"
              strokeDasharray={mapLayer === 'topographic' ? "4 2" : "none"}
            />

            {/* Trial Treatment Plots Subdivision */}
            <line x1="130" y1="38" x2="145" y2="167" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
            <line x1="200" y1="35" x2="200" y2="165" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
            <line x1="270" y1="32" x2="255" y2="162" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

            {/* Plot Replication Labels */}
            <text x="95" y="105" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="600">REP-1</text>
            <text x="165" y="105" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="600">REP-2</text>
            <text x="228" y="105" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="600">REP-3</text>
            <text x="282" y="105" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="600">CHECK</text>

            {/* Verification GPS Pins */}
            <circle cx="200" cy="100" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="200" cy="100" r="12" fill="#ef4444" opacity="0.2" className="animate-ping" />
          </svg>
        </div>

        {/* Top Controls Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">{fieldName}</span>
            <span className="text-slate-400">({areaHa} Ha)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setMapLayer('satellite')}
              className={`px-2 py-1 text-2xs font-semibold rounded cursor-pointer transition-colors ${
                mapLayer === 'satellite' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapLayer('topographic')}
              className={`px-2 py-1 text-2xs font-semibold rounded cursor-pointer transition-colors ${
                mapLayer === 'topographic' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Contour
            </button>
            <button
              onClick={() => setMapLayer('soil')}
              className={`px-2 py-1 text-2xs font-semibold rounded cursor-pointer transition-colors ${
                mapLayer === 'soil' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Soil Zonation
            </button>
          </div>
        </div>

        {/* Bottom Coordinates & Metadata Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
          <div className="flex items-center gap-3 text-xs bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-slate-300">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Navigation className="w-3.5 h-3.5" />
              <span>GPS: {gps}</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">Elevation: 258m MSL</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xs font-sans px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              4 GPS Vertices Verified
            </span>
          </div>
        </div>
      </div>

      {/* Field Details Footer Strip */}
      <div className="bg-slate-900/95 p-3.5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-slate-400 block text-2xs uppercase tracking-wider">Location</span>
          <span className="font-medium text-slate-200 truncate block mt-0.5">{location}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-2xs uppercase tracking-wider">Soil Profile</span>
          <span className="font-medium text-slate-200 truncate block mt-0.5">{soilType}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-2xs uppercase tracking-wider">Irrigation</span>
          <span className="font-medium text-emerald-400 truncate block mt-0.5">{irrigation}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-2xs uppercase tracking-wider">Verification</span>
          <span className="font-medium text-slate-200 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Cadastral Title Checked
          </span>
        </div>
      </div>
    </div>
  );
};
