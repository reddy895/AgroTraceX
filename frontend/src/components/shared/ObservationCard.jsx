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
    <div className={`ag-glass rounded-2xl p-5 border border-white/10 transition-all hover:border-white/20 ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
            {observation.id}
          </span>
          <Badge variant="green" size="sm">
            {observation.cropStage}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>{observation.date}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={observation.validationStatus} />
          {observation.validationStatus === 'Pending Review' && (userRole === 'ADMIN' || userRole === 'AGRONOMIST') && onValidate && (
            <button
              onClick={() => onValidate(observation.id)}
              className="text-xs px-3 py-1 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            >
              Sign-off & Validate
            </button>
          )}
        </div>
      </div>

      {/* Observer & GPS Verification */}
      <div className="mt-3.5 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-neutral-400" />
          <span>Observer: <strong className="text-white font-semibold">{observation.observerName}</strong></span>
        </div>

        {observation.gps && (
          <div className="flex items-center gap-1.5 font-mono text-neutral-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10 text-3xs">
            <Navigation className="w-3 h-3 text-white" />
            <span>
              {observation.gps.lat.toFixed(4)}°, {observation.gps.lng.toFixed(4)}°
            </span>
            <span className="text-white font-semibold">
              (±{observation.gps.accuracyMeters}m Verified)
            </span>
          </div>
        )}

        {observation.validatorName && (
          <div className="flex items-center gap-1 text-white text-3xs font-mono font-medium">
            <CheckCircle2 className="w-3 h-3 text-white" />
            <span>Verified by {observation.validatorName}</span>
          </div>
        )}
      </div>

      {/* Measurements Key Grid */}
      {measurements && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
          {measurements.plantHeightCm && (
            <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.08]">
              <span className="text-3xs uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <Ruler className="w-3 h-3 text-white" />
                Plant Height
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {measurements.plantHeightCm} cm
              </span>
            </div>
          )}

          {measurements.ndviIndex && (
            <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.08]">
              <span className="text-3xs uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <Activity className="w-3 h-3 text-white" />
                NDVI Index
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {measurements.ndviIndex}
              </span>
            </div>
          )}

          {measurements.canopyCoveragePercent && (
            <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.08]">
              <span className="text-3xs uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <Sprout className="w-3 h-3 text-white" />
                Canopy Cover
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {measurements.canopyCoveragePercent}%
              </span>
            </div>
          )}

          {measurements.soilMoisturePercent && (
            <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.08]">
              <span className="text-3xs uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <Droplets className="w-3 h-3 text-white" />
                Soil Moisture
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {measurements.soilMoisturePercent}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* Field Notes & Health Assessment */}
      <div className="mt-3.5 text-xs text-neutral-300 space-y-1.5">
        <p className="leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
          <strong className="text-white font-semibold">Agronomic Notes:</strong> {observation.notes}
        </p>
        <div className="flex flex-wrap gap-4 text-neutral-400 text-3xs font-mono pt-1">
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
        <div className="mt-4 pt-3 border-t border-white/[0.08]">
          <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
            Field Photo Evidence ({observation.photos.length})
          </span>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            {observation.photos.map((photo, pIdx) => (
              <div
                key={photo.id || pIdx}
                onClick={() => onPhotoClick && onPhotoClick(observation.photos, pIdx)}
                className="relative group rounded-xl overflow-hidden border border-white/10 cursor-pointer w-24 h-20 shrink-0 hover:border-white/40 transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-xs">
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
