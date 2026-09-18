// src/pages/Observations/ObservationsListPage.jsx
import React, { useState } from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ObservationCard } from '../../components/shared/ObservationCard';
import { ObservationFormModal } from './ObservationFormModal';
import { Lightbox } from '../../components/ui/Lightbox';
import { useAuth } from '../../context/AuthContext';
import { mockObservations as initialObservations } from '../../data/observations';
import { Eye, Plus, Search, Filter } from 'lucide-react';

export const ObservationsListPage = () => {
  const [observations, setObservations] = useState(initialObservations);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { currentUser } = useAuth();

  const filteredObservations = observations.filter((obs) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        obs.trialId.toLowerCase().includes(q) ||
        obs.trialName.toLowerCase().includes(q) ||
        obs.cropStage.toLowerCase().includes(q) ||
        obs.observerName.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter && obs.validationStatus !== statusFilter) return false;
    return true;
  });

  const handleOpenLightbox = (photos, idx) => {
    setLightboxImages(photos);
    setLightboxIndex(idx);
    setIsLightboxOpen(true);
  };

  const handleAddObservation = (newObs) => {
    setObservations((prev) => [newObs, ...prev]);
  };

  const handleValidateObservation = (obsId) => {
    setObservations((prev) =>
      prev.map((o) =>
        o.id === obsId
          ? {
              ...o,
              validationStatus: 'Validated',
              validatorName: currentUser.name,
              validationDate: 'Just now'
            }
          : o
      )
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Observations' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Field Observations & Audits
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Phenological metrics, canopy cover, and geotagged photographic inspections.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsFormModalOpen(true)}
        >
          Record Observation
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search by trial ID, stage, observer..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Select
            className="w-full sm:w-48 text-xs"
            placeholder="All Validation States"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={['Validated', 'Pending Review']}
          />
        </div>
      </div>

      {/* Observation Cards List */}
      <div className="space-y-4">
        {filteredObservations.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 text-sm">
            No observations matching your criteria.
          </div>
        ) : (
          filteredObservations.map((obs) => (
            <ObservationCard
              key={obs.id}
              observation={obs}
              onPhotoClick={handleOpenLightbox}
              onValidate={handleValidateObservation}
              userRole={currentUser.role}
            />
          ))
        )}
      </div>

      {/* Form Modal */}
      <ObservationFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onObservationAdded={handleAddObservation}
      />

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
};
