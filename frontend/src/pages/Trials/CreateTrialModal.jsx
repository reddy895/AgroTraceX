// src/pages/Trials/CreateTrialModal.jsx
import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useToast } from '../../context/ToastContext';
import { mockCompanies } from '../../data/companies';
import { mockSeedLots } from '../../data/seedLots';
import { mockFarmers } from '../../data/farmers';
import { mockFields } from '../../data/fields';
import { mockAgronomists, mockFieldOfficers } from '../../data/agronomists';
import { Sprout, CheckCircle2 } from 'lucide-react';

export const CreateTrialModal = ({ isOpen, onClose, onTrialCreated }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    crop: 'Hybrid Maize',
    variety: 'NA-GoldMax 901',
    companyId: 'COMP-001',
    seedLotId: 'LOT-MZ-2026-089',
    farmerId: 'FAR-1082',
    fieldId: 'FLD-MP-042',
    trialAreaHa: '2.4',
    agronomistId: 'AGRO-01',
    fieldOfficerId: 'OFF-101',
    startDate: '2026-10-01',
    expectedHarvest: '2027-02-15',
    targetYield: '7.8',
    designType: 'Randomized Complete Block Design (RCBD)',
    replicationsCount: '3',
    protocolObjective: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Please enter a trial protocol title', 'warning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newTrial = {
        id: `TR-2026-${Math.floor(100 + Math.random() * 900)}`,
        title: formData.title,
        crop: formData.crop,
        variety: formData.variety,
        seedLotId: formData.seedLotId,
        seedLotBatch: 'BN-2026-NEW',
        companyId: formData.companyId,
        companyName: mockCompanies.find((c) => c.id === formData.companyId)?.name || 'Novis AgroSciences',
        farmerId: formData.farmerId,
        farmerName: mockFarmers.find((f) => f.id === formData.farmerId)?.name || 'Rameshwar Patel',
        fieldId: formData.fieldId,
        fieldName: mockFields.find((f) => f.id === formData.fieldId)?.name || 'North Sector-A',
        trialAreaHa: parseFloat(formData.trialAreaHa) || 2.0,
        location: 'Khargone, Madhya Pradesh',
        region: 'Central India',
        agronomistId: formData.agronomistId,
        agronomistName: mockAgronomists.find((a) => a.id === formData.agronomistId)?.name || 'Dr. Arvind Shrivastava',
        fieldOfficerId: formData.fieldOfficerId,
        fieldOfficerName: mockFieldOfficers.find((o) => o.id === formData.fieldOfficerId)?.name || 'Vikas Shekhawat',
        currentStage: 'Protocol Setup',
        currentStageOrder: 1,
        progressPercentage: 5,
        status: 'Active',
        startDate: formData.startDate,
        sowingDate: 'Scheduled',
        expectedHarvest: formData.expectedHarvest,
        lastUpdated: 'Just now',
        targetYieldTonnesHa: parseFloat(formData.targetYield) || 7.5,
        protocolObjective: formData.protocolObjective
      };

      if (onTrialCreated) onTrialCreated(newTrial);
      setLoading(false);
      showToast(`Trial ${newTrial.id} created successfully!`, 'success');
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Field Trial"
      subtitle="Register an agronomic trial protocol linking seed genetics to verified farm plots"
      maxWidth="max-w-3xl"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} loading={loading}>
            Register & Activate Trial
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Trial Protocol Title"
          required
          placeholder="e.g. Drought-Resilience Evaluation of Hybrid Maize Cultivar NA-901"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Sponsoring Seed Company"
            required
            value={formData.companyId}
            onChange={(e) => handleChange('companyId', e.target.value)}
            options={mockCompanies.map((c) => ({ value: c.id, label: `${c.name} (${c.industry})` }))}
          />

          <Select
            label="Registered Seed Lot"
            required
            value={formData.seedLotId}
            onChange={(e) => handleChange('seedLotId', e.target.value)}
            options={mockSeedLots.map((s) => ({ value: s.id, label: `${s.id} - ${s.variety} (${s.crop})` }))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Crop Species"
            value={formData.crop}
            onChange={(e) => handleChange('crop', e.target.value)}
          />
          <Input
            label="Cultivar / Variety"
            value={formData.variety}
            onChange={(e) => handleChange('variety', e.target.value)}
          />
          <Input
            label="Target Yield (MT/Ha)"
            type="number"
            step="0.1"
            value={formData.targetYield}
            onChange={(e) => handleChange('targetYield', e.target.value)}
          />
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-500 block">
            Farm Plot & Field Execution Assignment
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Verified Farmer Grower"
              required
              value={formData.farmerId}
              onChange={(e) => handleChange('farmerId', e.target.value)}
              options={mockFarmers.map((f) => ({ value: f.id, label: `${f.name} (${f.location})` }))}
            />

            <Select
              label="Georeferenced Field Plot"
              required
              value={formData.fieldId}
              onChange={(e) => handleChange('fieldId', e.target.value)}
              options={mockFields.map((fl) => ({ value: fl.id, label: `${fl.name} (${fl.areaHa} Ha - ${fl.soilType})` }))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Lead Agronomist (Scientific Validation)"
              required
              value={formData.agronomistId}
              onChange={(e) => handleChange('agronomistId', e.target.value)}
              options={mockAgronomists.map((a) => ({ value: a.id, label: `${a.name} (${a.specialization})` }))}
            />

            <Select
              label="Assigned Field Officer (Mobile Recording)"
              required
              value={formData.fieldOfficerId}
              onChange={(e) => handleChange('fieldOfficerId', e.target.value)}
              options={mockFieldOfficers.map((o) => ({ value: o.id, label: `${o.name} (${o.region})` }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Start Date"
            type="date"
            required
            value={formData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
          />
          <Input
            label="Expected Harvest Date"
            type="date"
            required
            value={formData.expectedHarvest}
            onChange={(e) => handleChange('expectedHarvest', e.target.value)}
          />
          <Input
            label="Allocated Area (Ha)"
            type="number"
            step="0.1"
            value={formData.trialAreaHa}
            onChange={(e) => handleChange('trialAreaHa', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Protocol Objectives & Experimental Design
          </label>
          <textarea
            rows={3}
            value={formData.protocolObjective}
            onChange={(e) => handleChange('protocolObjective', e.target.value)}
            placeholder="Specify statistical layout (e.g. RCBD 3 reps), fertilizer dosage, treatment splits, and critical phenological observation intervals."
            className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0F4A2A]/20 focus:border-[#0F4A2A]"
          />
        </div>
      </form>
    </Modal>
  );
};
