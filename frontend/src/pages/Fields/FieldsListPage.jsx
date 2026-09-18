// src/pages/Fields/FieldsListPage.jsx
import React, { useState } from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Drawer } from '../../components/ui/Drawer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { InteractiveMap } from '../../components/shared/InteractiveMap';
import { mockFields } from '../../data/fields';
import {
  MapPin,
  Search,
  Plus,
  Compass,
  Navigation,
  Droplets,
  Layers,
  Calendar,
  User,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FieldsListPage = () => {
  const [fields, setFields] = useState(mockFields);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState(null);
  const navigate = useNavigate();

  const filteredFields = fields.filter((f) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.farmerName.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        f.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns = [
    {
      header: 'Field ID & Name',
      key: 'id',
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#0F4A2A] block">{row.id}</span>
          <span className="font-semibold text-xs text-slate-900 block mt-0.5">{row.name}</span>
        </div>
      )
    },
    {
      header: 'Farmer Partner',
      key: 'farmerName',
      render: (row) => (
        <span className="text-xs text-slate-800 font-medium truncate block max-w-[140px]">
          {row.farmerName}
        </span>
      )
    },
    {
      header: 'Location',
      key: 'location',
      render: (row) => (
        <span className="text-xs text-slate-600 truncate block max-w-[180px]">
          {row.location}
        </span>
      )
    },
    {
      header: 'Area',
      key: 'areaHa',
      render: (row) => (
        <span className="font-mono text-xs font-bold text-slate-900">{row.areaHa} Ha</span>
      )
    },
    {
      header: 'Soil & Irrigation',
      key: 'soilType',
      render: (row) => (
        <div className="text-xs text-slate-600">
          <span className="block truncate max-w-[160px] font-medium">{row.soilType.split('(')[0]}</span>
          <span className="text-3xs text-emerald-700 block truncate max-w-[160px]">{row.irrigation.split('(')[0]}</span>
        </div>
      )
    },
    {
      header: 'Active Trial',
      key: 'activeTrialId',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (row.activeTrialId) navigate(`/trials/${row.activeTrialId}`);
          }}
          className="font-mono text-xs font-bold text-[#0F4A2A] hover:underline cursor-pointer"
        >
          {row.activeTrialId || 'None'}
        </button>
      )
    },
    {
      header: 'Verification',
      key: 'verificationStatus',
      render: (row) => (
        <Badge variant="green" size="sm">
          {row.verificationStatus}
        </Badge>
      )
    },
    {
      header: 'Action',
      key: 'action',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedField(row);
          }}
        >
          View Map
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Fields' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Georeferenced Field Plots
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cadastral boundary polygons, satellite telemetry, and soil fertility profiles.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setSelectedField(fields[0])}
        >
          Map New Field
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search field ID, name, farmer..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Fields Table */}
      <Table
        columns={columns}
        data={filteredFields}
        onRowClick={(row) => setSelectedField(row)}
      />

      {/* Field Details & Map Drawer */}
      <Drawer
        isOpen={Boolean(selectedField)}
        onClose={() => setSelectedField(null)}
        title={selectedField?.name}
        subtitle={`${selectedField?.id} • ${selectedField?.location}`}
        width="max-w-2xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-2xs text-slate-500 font-mono">
              Weather Station: {selectedField?.weatherStationId}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedField(null)}
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedField && (
          <div className="space-y-6 text-xs text-slate-700">
            {/* Interactive Field Visual Map */}
            <InteractiveMap
              fieldName={selectedField.name}
              location={selectedField.location}
              gps={`${selectedField.gpsCenter.lat}° N, ${selectedField.gpsCenter.lng}° E`}
              areaHa={selectedField.areaHa}
              soilType={selectedField.soilType}
              irrigation={selectedField.irrigation}
            />

            {/* Field Boundary Polygon Coordinates */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center justify-between">
                <span>4-Vertex Cadastral Boundary Coordinates</span>
                <span className="text-emerald-700 font-normal">Sub-meter RTK Verified</span>
              </h4>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-3xs space-y-1">
                {selectedField.boundaryCoordinates.map((pt, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-600">
                    <span>Vertex {idx + 1}:</span>
                    <span className="font-semibold text-slate-900">{pt.lat}° N, {pt.lng}° E</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soil & Nutrients */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Soil Chemistry & Nutrients
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-3xs">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-400 block">pH Level</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedField.soilPh}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-400 block">Organic Matter</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedField.organicMatter}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-400 block">Available N</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedField.nitrogenKgHa} kg/ha</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-400 block">Available P-K</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedField.phosphorusKgHa}-{selectedField.potassiumKgHa}</span>
                </div>
              </div>
            </div>

            {/* Historical Yield & Active Trials */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Trial History & Productivity
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Historical Benchmark Yield:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedField.historicalYieldTonnesHa} MT/Ha</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current Occupying Trial:</span>
                  <span className="font-mono font-bold text-[#0F4A2A]">{selectedField.activeTrialId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current In-Ground Crop:</span>
                  <span className="font-medium text-slate-900">{selectedField.currentCrop}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
