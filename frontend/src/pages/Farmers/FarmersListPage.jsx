// src/pages/Farmers/FarmersListPage.jsx
import React, { useState } from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Drawer } from '../../components/ui/Drawer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { mockFarmers } from '../../data/farmers';
import { mockFields } from '../../data/fields';
import {
  Users,
  Search,
  Plus,
  UserCheck,
  MapPin,
  FileCheck,
  CreditCard,
  Phone,
  Droplets,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const FarmersListPage = () => {
  const [farmers, setFarmers] = useState(mockFarmers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const filteredFarmers = farmers.filter((f) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        f.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns = [
    {
      header: 'Farmer Name & ID',
      key: 'name',
      render: (row) => (
        <div>
          <span className="font-semibold text-xs text-slate-900 block">{row.name}</span>
          <span className="font-mono text-3xs text-slate-400">{row.id}</span>
        </div>
      )
    },
    {
      header: 'Location',
      key: 'location',
      render: (row) => (
        <div className="text-xs text-slate-700 max-w-[180px] truncate">
          {row.location}
        </div>
      )
    },
    {
      header: 'Land & Trial Area',
      key: 'totalLandHa',
      render: (row) => (
        <div className="text-xs">
          <span className="font-medium text-slate-900 block">{row.totalLandHa} Ha Total</span>
          <span className="text-3xs text-emerald-700 font-semibold">{row.availableTrialHa} Ha Available</span>
        </div>
      )
    },
    {
      header: 'Irrigation & Soil',
      key: 'irrigationType',
      render: (row) => (
        <div className="text-xs text-slate-600">
          <span className="block truncate max-w-[150px]">{row.irrigationType}</span>
          <span className="text-3xs text-slate-400 block truncate max-w-[150px]">{row.soilType}</span>
        </div>
      )
    },
    {
      header: 'Reliability',
      key: 'reliabilityScore',
      render: (row) => (
        <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{row.reliabilityScore}</span>
          <span className="text-3xs text-slate-400 font-normal">({row.successRate}%)</span>
        </div>
      )
    },
    {
      header: 'Aadhaar / KYC',
      key: 'aadhaarVerified',
      render: (row) => (
        <Badge variant={row.aadhaarVerified ? 'green' : 'amber'} size="sm">
          {row.aadhaarVerified ? 'Verified KYC' : 'Pending KYC'}
        </Badge>
      )
    },
    {
      header: 'Active Trials',
      key: 'activeTrials',
      render: (row) => (
        <span className="font-mono text-xs font-bold text-[#0F4A2A]">
          {row.activeTrials.length} active ({row.previousTrialsCount} past)
        </span>
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
            setSelectedFarmer(row);
          }}
        >
          View Profile
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Farmers' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Verified Farmer Growers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Certified partner farmers maintaining trial acreage with verified land titles and soil history.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setSelectedFarmer(farmers[0])}
        >
          Onboard Farmer
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search farmer name, district, or ID..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Farmers Table */}
      <Table
        columns={columns}
        data={filteredFarmers}
        onRowClick={(row) => setSelectedFarmer(row)}
      />

      {/* Farmer Profile Drawer */}
      <Drawer
        isOpen={Boolean(selectedFarmer)}
        onClose={() => setSelectedFarmer(null)}
        title={selectedFarmer?.name}
        subtitle={`${selectedFarmer?.id} • ${selectedFarmer?.location}`}
        width="max-w-lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-2xs text-slate-500 font-mono">
              Partner since {selectedFarmer?.joinedDate}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFarmer(null)}
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedFarmer && (
          <div className="space-y-6 text-xs text-slate-700">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">Total Holding</span>
                <span className="font-bold text-sm text-slate-900 mt-0.5 block">
                  {selectedFarmer.totalLandHa} Hectares
                </span>
                <span className="text-3xs text-emerald-700 font-medium">
                  {selectedFarmer.availableTrialHa} Ha available for trials
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">Reliability Score</span>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-700 mt-0.5">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{selectedFarmer.reliabilityScore} / 5.0</span>
                </div>
                <span className="text-3xs text-slate-500">
                  {selectedFarmer.successRate}% trial success rate
                </span>
              </div>
            </div>

            {/* Personal & Contact Information */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Personal & Contact Info
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedFarmer.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">GPS Base:</span>
                  <span className="font-mono text-slate-700">{selectedFarmer.gpsCoordinates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">KYC Status:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Aadhaar & Land Title Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Land & Soil Agronomics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Agronomic Land Attributes
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Soil Classification:</span>
                  <span className="font-medium text-slate-900">{selectedFarmer.soilType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Soil pH & Carbon:</span>
                  <span className="font-mono text-slate-900">pH {selectedFarmer.soilPh} • OC {selectedFarmer.organicCarbonPercent}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Irrigation Setup:</span>
                  <span className="font-medium text-slate-900">{selectedFarmer.irrigationType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Water Security:</span>
                  <span className="text-emerald-700 font-medium">{selectedFarmer.waterAvailability}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Crop History:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedFarmer.cropHistory.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-3xs font-medium text-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Payments & Bank Details */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Remuneration & Bank Account
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Account:</span>
                  <span className="font-mono font-medium text-slate-900">{selectedFarmer.bankDetails}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Direct Benefit Transfer:</span>
                  <span className="text-emerald-700 font-semibold">{selectedFarmer.paymentStatus}</span>
                </div>
              </div>
            </div>

            {/* Uploaded Verification Documents */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Verified Documents ({selectedFarmer.documents.length})
              </h4>
              <div className="space-y-1.5">
                {selectedFarmer.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium text-slate-800">{doc.name}</span>
                    </div>
                    <span className="text-3xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
