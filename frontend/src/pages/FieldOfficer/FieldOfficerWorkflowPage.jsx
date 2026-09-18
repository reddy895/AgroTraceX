// src/pages/FieldOfficer/FieldOfficerWorkflowPage.jsx
import React, { useState } from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useToast } from '../../context/ToastContext';
import { mockTrials } from '../../data/trials';
import { mockFields } from '../../data/fields';
import {
  Smartphone,
  Navigation,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Sprout,
  Ruler,
  FileText,
  Send,
  Upload,
  ArrowRight,
  RefreshCw,
  Sun
} from 'lucide-react';

export const FieldOfficerWorkflowPage = () => {
  const { showToast } = useToast();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1); // 1 to 7

  // Wizard state
  const [selectedTrialId, setSelectedTrialId] = useState('TR-2026-084');
  const [gpsStatus, setGpsStatus] = useState({ verified: true, accuracy: 2.1, lat: 21.8234, lng: 75.6189 });
  const [photosUploaded, setPhotosUploaded] = useState([
    'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80'
  ]);
  const [cropStage, setCropStage] = useState('Flowering / VT-R1');
  const [plantHeight, setPlantHeight] = useState('218');
  const [canopyCover, setCanopyCover] = useState('88');
  const [ndviIndex, setNdviIndex] = useState('0.84');
  const [soilMoisture, setSoilMoisture] = useState('24.2');
  const [notes, setNotes] = useState('Tasseling complete across 92% of plants in Replicate 1. ASI measured at 1.8 days.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeTrial = mockTrials.find((t) => t.id === selectedTrialId) || mockTrials[0];

  const handleStartVisit = (trialId) => {
    if (trialId) setSelectedTrialId(trialId);
    setWizardStep(1);
    setIsWizardOpen(true);
  };

  const handleNextStep = () => {
    if (wizardStep < 7) {
      setWizardStep(wizardStep + 1);
    } else {
      handleSubmitObservation();
    }
  };

  const handlePrevStep = () => {
    if (wizardStep > 1) setWizardStep(wizardStep - 1);
  };

  const handleSubmitObservation = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsWizardOpen(false);
      setWizardStep(1);
      showToast('Field observation submitted successfully with verified GPS!', 'success');
    }, 600);
  };

  const handleSimulateGPS = () => {
    showToast('Acquiring high-precision GNSS fix...', 'info');
    setTimeout(() => {
      setGpsStatus({
        verified: true,
        accuracy: 1.8,
        lat: 21.8234 + (Math.random() - 0.5) * 0.0002,
        lng: 75.6189 + (Math.random() - 0.5) * 0.0002
      });
      showToast('Sub-meter GPS verified inside trial boundary polygon!', 'success');
    }, 400);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Field Officer Flow' }]} />

      {/* Outdoor Mode High-Contrast Banner */}
      <div className="bg-[#0F4A2A] text-white rounded-2xl p-5 sm:p-7 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 text-3xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            High-Contrast Outdoor Mode Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Field Officer Mobile Portal
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Optimized for bright sunlight, fast touch operations, and instant sub-meter geofenced observation logs.
          </p>
        </div>

        {/* Big Mobile-Friendly "Start Field Visit" Button */}
        <Button
          variant="success"
          size="lg"
          onClick={() => handleStartVisit()}
          className="py-4 px-6 text-base font-bold shadow-lg border-2 border-emerald-300 hover:scale-102 transition-transform cursor-pointer"
          icon={Navigation}
        >
          Start Field Visit Now
        </Button>
      </div>

      {/* 4 Outdoor Operational Glance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border-2 border-slate-200 p-4 rounded-xl shadow-xs">
          <span className="text-3xs uppercase font-extrabold text-slate-500 block">Today's Visits</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">4</span>
          <span className="text-3xs text-emerald-700 font-bold">2 completed, 2 remaining</span>
        </div>

        <div className="bg-white border-2 border-amber-200 bg-amber-50/40 p-4 rounded-xl shadow-xs">
          <span className="text-3xs uppercase font-extrabold text-amber-800 block">Overdue Visits</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 mt-1 block">1</span>
          <span className="text-3xs text-amber-800 font-bold">TR-2026-084 Silking (+24h)</span>
        </div>

        <div className="bg-white border-2 border-slate-200 p-4 rounded-xl shadow-xs">
          <span className="text-3xs uppercase font-extrabold text-slate-500 block">Pending Obs.</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">3</span>
          <span className="text-3xs text-slate-600 font-bold">Drafts synced offline</span>
        </div>

        <div className="bg-white border-2 border-emerald-200 bg-emerald-50/40 p-4 rounded-xl shadow-xs">
          <span className="text-3xs uppercase font-extrabold text-emerald-800 block">GPS Precision</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-1 block">1.8m</span>
          <span className="text-3xs text-emerald-800 font-bold">RTK GNSS Locked</span>
        </div>
      </div>

      {/* Today's Scheduled Visits List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0F4A2A]" />
            Scheduled Field Visits for Officer Vikas Shekhawat
          </h3>
          <span className="text-xs font-mono text-slate-500">Khargone & Nimar Zone</span>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'TR-2026-084',
              crop: 'Hybrid Maize (NA-901)',
              farmer: 'Rameshwar Patel',
              field: 'FLD-MP-042 (Kharche Sector-A)',
              time: '10:00 AM',
              status: 'Overdue (+24h)',
              distance: '0.4 km away',
              urgent: true
            },
            {
              id: 'TR-2026-092',
              crop: 'Hybrid Maize (NA-901)',
              farmer: 'Venkata Ramanappa',
              field: 'FLD-KA-078',
              time: '02:30 PM',
              status: 'Scheduled',
              distance: '1.8 km away',
              urgent: false
            }
          ].map((visit) => (
            <div
              key={visit.id}
              className={`bg-white border-2 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-xs ${
                visit.urgent ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#0F4A2A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {visit.id}
                  </span>
                  <span
                    className={`text-3xs font-bold uppercase px-2 py-0.5 rounded ${
                      visit.urgent ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {visit.status}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Scheduled {visit.time}</span>
                </div>

                <h4 className="text-base font-bold text-slate-900">{visit.crop}</h4>
                <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                  <span>Farmer: <strong>{visit.farmer}</strong></span>
                  <span>Field: {visit.field}</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Navigation className="w-3 h-3" /> {visit.distance}
                  </span>
                </div>
              </div>

              <Button
                variant={visit.urgent ? 'danger' : 'primary'}
                size="md"
                onClick={() => handleStartVisit(visit.id)}
                icon={Camera}
              >
                Start Visit Log
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Guided 7-Step Field Visit Wizard Modal */}
      <Modal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        title={`Field Visit Wizard — Step ${wizardStep} of 7`}
        subtitle="High-contrast guided protocol for outdoor mobile recording"
        maxWidth="max-w-2xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevStep}
              disabled={wizardStep === 1 || isSubmitting}
            >
              Back
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i + 1 === wizardStep
                      ? 'bg-[#0F4A2A] w-4'
                      : i + 1 < wizardStep
                      ? 'bg-emerald-500'
                      : 'bg-slate-200'
                  } transition-all`}
                />
              ))}
            </div>

            <Button
              variant={wizardStep === 7 ? 'success' : 'primary'}
              size="sm"
              onClick={handleNextStep}
              loading={isSubmitting}
            >
              {wizardStep === 7 ? 'Submit Observation' : 'Next Step →'}
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          {/* Step 1: Select Trial */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                <Sprout className="w-4 h-4 text-[#0F4A2A]" />
                Step 1: Select Target Trial & Plot
              </div>
              <Select
                label="Confirm Trial Protocol"
                value={selectedTrialId}
                onChange={(e) => setSelectedTrialId(e.target.value)}
                options={mockTrials.map((t) => ({
                  value: t.id,
                  label: `${t.id} - ${t.crop} (${t.farmerName})`
                }))}
              />
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="font-semibold text-slate-900">{activeTrial.title}</div>
                <div className="text-slate-600">Cultivar: {activeTrial.variety} • Stage: {activeTrial.currentStage}</div>
                <div className="text-slate-500">Field: {activeTrial.fieldName} ({activeTrial.trialAreaHa} Ha)</div>
              </div>
            </div>
          )}

          {/* Step 2: Verify GPS */}
          {wizardStep === 2 && (
            <div className="space-y-4 text-center py-2">
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-slate-500">
                <Navigation className="w-4 h-4 text-[#0F4A2A]" />
                Step 2: Sub-Meter Geofenced GPS Verification
              </div>

              <div className="bg-emerald-50 border-2 border-emerald-300 p-5 rounded-xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-emerald-950">
                  GPS Location Verified Inside Plot FLD-MP-042
                </h4>
                <p className="text-xs text-emerald-800 font-mono">
                  Coordinates: {gpsStatus.lat.toFixed(5)}° N, {gpsStatus.lng.toFixed(5)}° E
                </p>
                <div className="text-2xs font-bold text-emerald-700 bg-white/80 py-1 px-3 rounded-full inline-block">
                  Accuracy: ±{gpsStatus.accuracy} meters (Within 4m Required Tolerance)
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={RefreshCw}
                onClick={handleSimulateGPS}
              >
                Re-acquire Satellite Fix
              </Button>
            </div>
          )}

          {/* Step 3: Capture Photo */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                <Camera className="w-4 h-4 text-[#0F4A2A]" />
                Step 3: Capture Geotagged Field Photo Evidence
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-[#0F4A2A] transition-colors cursor-pointer bg-slate-50">
                <Camera className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-800 block">Tap to Open Camera / Upload</span>
                <span className="text-3xs text-slate-500 mt-1 block">Auto-embeds timestamp & GPS watermark</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {photosUploaded.map((url, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video">
                    <img src={url} alt="Captured" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 text-3xs bg-black/60 text-white px-1.5 py-0.5 rounded font-mono">
                      Watermarked
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Crop Stage */}
          {wizardStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                <Sprout className="w-4 h-4 text-[#0F4A2A]" />
                Step 4: Select Phenological Crop Stage
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  'Germination (VE-V1)',
                  'Early Vegetative (V4)',
                  'Late Vegetative (V10)',
                  'Flowering / VT-R1',
                  'Grain Filling / R3',
                  'Physiological Maturity'
                ].map((stg) => (
                  <button
                    key={stg}
                    type="button"
                    onClick={() => setCropStage(stg)}
                    className={`p-3 rounded-lg border text-xs font-bold text-left transition-all cursor-pointer ${
                      cropStage === stg
                        ? 'border-[#0F4A2A] bg-emerald-50 text-[#0F4A2A] ring-2 ring-[#0F4A2A]/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Measurements */}
          {wizardStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                <Ruler className="w-4 h-4 text-[#0F4A2A]" />
                Step 5: Enter Agronomic Plot Measurements
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Plant Height (cm)"
                  type="number"
                  value={plantHeight}
                  onChange={(e) => setPlantHeight(e.target.value)}
                />
                <Input
                  label="Canopy Coverage (%)"
                  type="number"
                  value={canopyCover}
                  onChange={(e) => setCanopyCover(e.target.value)}
                />
                <Input
                  label="NDVI Index"
                  type="number"
                  step="0.01"
                  value={ndviIndex}
                  onChange={(e) => setNdviIndex(e.target.value)}
                />
                <Input
                  label="Soil Moisture (%)"
                  type="number"
                  step="0.1"
                  value={soilMoisture}
                  onChange={(e) => setSoilMoisture(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 6: Notes */}
          {wizardStep === 6 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                <FileText className="w-4 h-4 text-[#0F4A2A]" />
                Step 6: Field Observations & Pest Notes
              </div>

              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log pest counts, silk emergence uniformity, and moisture status..."
                className="w-full text-xs rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#0F4A2A]/20"
              />
            </div>
          )}

          {/* Step 7: Review & Submit */}
          {wizardStep === 7 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                <Send className="w-4 h-4 text-[#0F4A2A]" />
                Step 7: Final Review & Submit Observation
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Trial ID:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedTrialId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">GPS Fix:</span>
                  <span className="text-emerald-700 font-bold">±{gpsStatus.accuracy}m Verified</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Stage:</span>
                  <span className="font-semibold text-slate-900">{cropStage}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Height / Canopy:</span>
                  <span className="font-mono font-bold text-slate-900">{plantHeight}cm • {canopyCover}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Notes:</span>
                  <p className="bg-white p-2 rounded border border-slate-200 text-slate-700 italic">
                    "{notes}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
