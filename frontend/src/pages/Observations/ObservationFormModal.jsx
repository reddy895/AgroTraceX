// src/pages/Observations/ObservationFormModal.jsx
import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useToast } from '../../context/ToastContext';
import { mockTrials } from '../../data/trials';
import { mockFields } from '../../data/fields';
import { Camera, Navigation, CheckCircle2, Upload, AlertCircle } from 'lucide-react';

export const ObservationFormModal = ({ isOpen, onClose, onObservationAdded }) => {
  const { showToast } = useToast();
  const [trialId, setTrialId] = useState('TR-2026-084');
  const [fieldId, setFieldId] = useState('FLD-MP-042');
  const [date, setDate] = useState('2026-09-18');
  const [cropStage, setCropStage] = useState('Flowering / Tasseling');
  const [plantHealth, setPlantHealth] = useState('Vigorous & Uniform');
  const [disease, setDisease] = useState('None detected');
  const [pest, setPest] = useState('Minor FAW threshold <1%');
  const [plantHeight, setPlantHeight] = useState('218');
  const [canopyCoverage, setCanopyCoverage] = useState('88');
  const [ndviIndex, setNdviIndex] = useState('0.84');
  const [notes, setNotes] = useState('');
  const [gpsVerified, setGpsVerified] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newObs = {
        id: `OBS-2026-${Math.floor(500 + Math.random() * 400)}`,
        trialId,
        trialName: mockTrials.find((t) => t.id === trialId)?.title || 'Field Trial',
        date: `${date} 11:00 AM`,
        observerId: 'OFF-101',
        observerName: 'Vikas Shekhawat (Field Officer)',
        cropStage,
        gps: { lat: 21.8234, lng: 75.6189, accuracyMeters: 2.1, isVerified: true },
        plantHealth,
        diseaseIncidence: disease,
        pestIncidence: pest,
        measurements: {
          plantHeightCm: parseFloat(plantHeight) || 200,
          canopyCoveragePercent: parseFloat(canopyCoverage) || 80,
          ndviIndex: parseFloat(ndviIndex) || 0.8
        },
        notes: notes || 'Standard agronomic observation logged.',
        validationStatus: 'Pending Review',
        photos: [
          {
            id: `p-${Date.now()}`,
            caption: `Field observation at ${cropStage}`,
            stage: cropStage,
            timestamp: date,
            url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80'
          }
        ]
      };

      if (onObservationAdded) onObservationAdded(newObs);
      setLoading(false);
      showToast(`Observation ${newObs.id} submitted for agronomist validation`, 'success');
      onClose();
    }, 500);
  };

  const handleSaveDraft = () => {
    showToast('Observation draft saved locally on terminal', 'info');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Scientific Field Observation"
      subtitle="Geotagged phenological record for scientific validation"
      maxWidth="max-w-3xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="outline" size="sm" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit} loading={loading}>
              Submit Observation
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Field Trial"
            required
            value={trialId}
            onChange={(e) => setTrialId(e.target.value)}
            options={mockTrials.map((t) => ({ value: t.id, label: `${t.id}: ${t.crop} (${t.variety})` }))}
          />

          <Select
            label="Field Plot"
            required
            value={fieldId}
            onChange={(e) => setFieldId(e.target.value)}
            options={mockFields.map((f) => ({ value: f.id, label: `${f.id}: ${f.name}` }))}
          />
        </div>

        {/* GPS Verification Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
            <Navigation className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>GPS Auto-Verified: 21.8234° N, 75.6189° E (Accuracy: ±2.1m)</span>
          </div>
          <span className="text-3xs font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full">
            In Boundary
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Observation Date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Select
            label="Crop Stage"
            required
            value={cropStage}
            onChange={(e) => setCropStage(e.target.value)}
            options={[
              'Germination (VE)',
              'Vegetative (V4-V8)',
              'Late Vegetative (V12)',
              'Flowering / Tasseling',
              'Silking / Anthesis',
              'Grain Filling',
              'Maturity / Harvest'
            ]}
          />

          <Input
            label="General Plant Health"
            value={plantHealth}
            onChange={(e) => setPlantHealth(e.target.value)}
          />
        </div>

        {/* Growth & Yield Measurements */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-500 block">
            Agronomic Measurements
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Plant Height (cm)"
              type="number"
              value={plantHeight}
              onChange={(e) => setPlantHeight(e.target.value)}
            />
            <Input
              label="Canopy Coverage (%)"
              type="number"
              value={canopyCoverage}
              onChange={(e) => setCanopyCoverage(e.target.value)}
            />
            <Input
              label="NDVI Sensor Score"
              type="number"
              step="0.01"
              value={ndviIndex}
              onChange={(e) => setNdviIndex(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Input
              label="Disease Screening"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
            />
            <Input
              label="Pest Trap Counts / Pressure"
              value={pest}
              onChange={(e) => setPest(e.target.value)}
            />
          </div>
        </div>

        {/* Photo Evidence Upload Box */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Photographic Evidence Upload
          </label>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-[#0F4A2A] transition-colors cursor-pointer bg-slate-50/50">
            <Camera className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
            <span className="text-xs font-semibold text-slate-800 block">
              Click to capture or upload trial photos
            </span>
            <span className="text-3xs text-slate-500 block mt-0.5">
              JPG, PNG up to 25MB • EXIF GPS preserved
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Detailed Agronomic Field Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record anthesis-silking synchrony, weed pressure, soil moisture, and any protocol deviations..."
            className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0F4A2A]/20"
          />
        </div>
      </form>
    </Modal>
  );
};
