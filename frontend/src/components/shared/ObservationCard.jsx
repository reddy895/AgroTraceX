// src/components/shared/ObservationCard.jsx
import React from 'react';
import {
  Calendar,
  User,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Activity,
  Maximize2,
  Droplets,
  Ruler,
  Sprout
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { Badge } from '../ui/Badge';

export const ObservationCard = ({
  observation,
  onPhotoClick,
  onValidate,
  userRole = 'ADMIN',
  className = ''
}) => {
  if (!observation) return null;

  const { measurements } = observation;

  return (
    <div className={`bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs transition-shadow hover:shadow-sm ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
            {observation.id}
          </span>
          <Badge variant="green" size="sm">
            {observation.cropStage}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{observation.date}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={observation.validationStatus} />
          {observation.validationStatus === 'Pending Review' && (userRole === 'ADMIN' || userRole === 'AGRONOMIST') && onValidate && (
            <button
              onClick={() => onValidate(observation.id)}
              className="text-xs px-2.5 py-1 bg-[#0F4A2A] text-white rounded font-medium hover:bg-[#0D3F24] transition-colors cursor-pointer"
            >
              Sign-off & Validate
            </button>
          )}
        </div>
      </div>

      {/* Observer & GPS Verification */}
      <div className="mt-3.5 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>Observer: <strong className="text-slate-800 font-semibold">{observation.observerName}</strong></span>
        </div>

        {observation.gps && (
          <div className="flex items-center gap-1.5 font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            <Navigation className="w-3 h-3 text-emerald-600" />
            <span>
              {observation.gps.lat.toFixed(4)}°, {observation.gps.lng.toFixed(4)}°
            </span>
            <span className="text-emerald-700 text-3xs font-semibold">
              (±{observation.gps.accuracyMeters}m Verified)
            </span>
          </div>
        )}

        {observation.validatorName && (
          <div className="flex items-center gap-1 text-emerald-700 text-3xs font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Verified by {observation.validatorName}</span>
          </div>
        )}
      </div>

      {/* Measurements Key Grid */}
      {measurements && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {measurements.plantHeightCm && (
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
                <Ruler className="w-3 h-3 text-emerald-600" />
                Plant Height
              </span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                {measurements.plantHeightCm} cm
              </span>
            </div>
          )}

          {measurements.ndviIndex && (
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
                <Activity className="w-3 h-3 text-blue-600" />
                NDVI Index
              </span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                {measurements.ndviIndex}
              </span>
            </div>
          )}

          {measurements.canopyCoveragePercent && (
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
                <Sprout className="w-3 h-3 text-emerald-600" />
                Canopy Cover
              </span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                {measurements.canopyCoveragePercent}%
              </span>
            </div>
          )}

          {measurements.soilMoisturePercent && (
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-600" />
                Soil Moisture
              </span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                {measurements.soilMoisturePercent}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* Field Notes & Health Assessment */}
      <div className="mt-3.5 text-xs text-slate-700 space-y-1.5">
        <p className="leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
          <strong className="text-slate-900 font-semibold">Agronomic Notes:</strong> {observation.notes}
        </p>
        <div className="flex flex-wrap gap-4 text-slate-500 text-3xs pt-1">
          {observation.diseaseIncidence && (
            <span><strong>Disease:</strong> {observation.diseaseIncidence}</span>
          )}
          {observation.pestIncidence && (
            <span><strong>Pests:</strong> {observation.pestIncidence}</span>
          )}
        </div>
      </div>

      {/* Photos Thumbnail Grid with Lightbox Action */}
      {observation.photos && observation.photos.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <span className="text-3xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">
            Field Photo Evidence ({observation.photos.length})
          </span>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            {observation.photos.map((photo, pIdx) => (
              <div
                key={photo.id || pIdx}
                onClick={() => onPhotoClick && onPhotoClick(observation.photos, pIdx)}
                className="relative group rounded-lg overflow-hidden border border-slate-200 cursor-pointer w-24 h-20 shrink-0 shadow-2xs hover:border-[#0F4A2A] transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
