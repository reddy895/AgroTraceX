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

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/10 bg-black text-white shadow-2xl ${className}`}>
      {/* Visual Canvas / Simulated Dark Grayscale Satellite Mesh */}
      <div className="relative w-full h-64 sm:h-84 bg-[#050505] overflow-hidden flex items-center justify-center select-none">
        {/* SVG Geological & Satellite Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="monoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222222" strokeWidth="0.8" />
            </pattern>
            <pattern id="monoDotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#333333" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#monoGrid)" />
          {mapLayer === 'topographic' && (
            <>
              {/* Contour elevation lines in monochrome */}
              <ellipse cx="50%" cy="50%" rx="35%" ry="25%" fill="none" stroke="#666666" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <ellipse cx="50%" cy="50%" rx="25%" ry="18%" fill="none" stroke="#888888" strokeWidth="1" opacity="0.8" />
              <ellipse cx="50%" cy="50%" rx="15%" ry="10%" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />
            </>
          )}
        </svg>

        {/* Textured Field Surface Visual in Monochrome */}
        <div
          className="absolute inset-4 rounded-xl border border-white/15 transition-all duration-300 flex items-center justify-center bg-white/[0.02]"
        >
          {/* Geofenced Polygon Boundary (White/Gray) */}
          <svg className="w-full h-full p-4 overflow-visible" viewBox="0 0 400 200">
            {/* Field Boundary Polygon */}
            <polygon
              points="60,40 340,30 310,160 90,170"
              fill="rgba(255, 255, 255, 0.04)"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray={mapLayer === 'topographic' ? "4 2" : "none"}
            />

            {/* Trial Treatment Plots Subdivision */}
            <line x1="130" y1="38" x2="145" y2="167" stroke="#666666" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="200" y1="35" x2="200" y2="165" stroke="#666666" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="270" y1="32" x2="255" y2="162" stroke="#666666" strokeWidth="1" strokeDasharray="2 2" />

            {/* Plot Replication Labels */}
            <text x="95" y="105" fill="#a3a3a3" fontSize="10" fontFamily="monospace" fontWeight="600">REP-1</text>
            <text x="165" y="105" fill="#a3a3a3" fontSize="10" fontFamily="monospace" fontWeight="600">REP-2</text>
            <text x="228" y="105" fill="#a3a3a3" fontSize="10" fontFamily="monospace" fontWeight="600">REP-3</text>
            <text x="282" y="105" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="700">CHECK</text>

            {/* Active site glowing white point */}
            <circle cx="200" cy="100" r="4.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="200" cy="100" r="12" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" className="animate-ping" />
          </svg>
        </div>

        {/* Top Controls Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-semibold text-white">{fieldName}</span>
            <span className="text-neutral-400">({areaHa} Ha)</span>
          </div>

          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-full border border-white/15">
            {['satellite', 'topographic', 'soil'].map((l) => (
              <button
                key={l}
                onClick={() => setMapLayer(l)}
                className={`px-3 py-1 text-3xs font-mono uppercase tracking-wider rounded-full cursor-pointer transition-colors ${
                  mapLayer === l ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {l === 'soil' ? 'Soil Zonation' : l}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Coordinates & Metadata Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
          <div className="flex items-center gap-3 text-xs bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 font-mono text-neutral-300">
            <div className="flex items-center gap-1.5 text-white">
              <Navigation className="w-3.5 h-3.5" />
              <span>GPS: {gps}</span>
            </div>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <span className="text-neutral-400 hidden sm:inline text-3xs">Elevation: 258m MSL</span>
          </div>

          <span className="text-3xs font-mono px-3 py-1 rounded-full bg-white/10 text-neutral-200 border border-white/15">
            4 GPS VERTICES VERIFIED
          </span>
        </div>
      </div>

      {/* Field Details Footer Strip */}
      <div className="bg-black/90 p-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="text-neutral-500 block text-3xs uppercase tracking-wider">Location</span>
          <span className="font-medium text-white truncate block mt-0.5">{location}</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-3xs uppercase tracking-wider">Soil Profile</span>
          <span className="font-medium text-white truncate block mt-0.5">{soilType}</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-3xs uppercase tracking-wider">Irrigation</span>
          <span className="font-medium text-white truncate block mt-0.5">{irrigation}</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-3xs uppercase tracking-wider">Verification</span>
          <span className="font-medium text-white flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Cadastral Title Checked
          </span>
        </div>
      </div>
    </div>
  );
};
