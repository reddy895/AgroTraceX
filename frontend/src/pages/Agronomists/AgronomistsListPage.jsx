// src/pages/Agronomists/AgronomistsListPage.jsx
import React, { useState } from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Drawer } from '../../components/ui/Drawer';
import { Badge } from '../../components/ui/Badge';
import { mockAgronomists } from '../../data/agronomists';
import {
  Stethoscope,
  Search,
  Plus,
  Award,
  Calendar,
  CheckCircle2,
  MapPin,
  Star,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AgronomistsListPage = () => {
  const [agronomists, setAgronomists] = useState(mockAgronomists);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgronomist, setSelectedAgronomist] = useState(null);
  const navigate = useNavigate();

  const filteredAgronomists = agronomists.filter((a) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.specialization.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns = [
    {
      header: 'Agronomist Name & Degree',
      key: 'name',
      render: (row) => (
        <div>
          <span className="font-bold text-xs text-slate-900 block">{row.name}</span>
          <span className="text-3xs text-slate-500 block truncate max-w-[200px]">{row.degree}</span>
        </div>
      )
    },
    {
      header: 'Specialization',
      key: 'specialization',
      render: (row) => (
        <span className="text-xs text-slate-700 truncate max-w-[220px] block">
          {row.specialization}
        </span>
      )
    },
    {
      header: 'Experience',
      key: 'experienceYears',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-800">{row.experienceYears} Years</span>
      )
    },
    {
      header: 'Location Hub',
      key: 'location',
      render: (row) => (
        <div className="flex items-center gap-1 text-xs text-slate-600 truncate max-w-[140px]">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{row.location}</span>
        </div>
      )
    },
    {
      header: 'Assigned Trials',
      key: 'assignedTrials',
      render: (row) => (
        <div className="flex items-center gap-1 flex-wrap">
          {row.assignedTrials.map((tId) => (
            <span
              key={tId}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/trials/${tId}`);
              }}
              className="px-1.5 py-0.5 rounded bg-emerald-50 text-[#0F4A2A] font-mono text-3xs font-semibold cursor-pointer hover:bg-emerald-100"
            >
              {tId}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Availability',
      key: 'availability',
      render: (row) => (
        <Badge
          variant={row.availability === 'Available' ? 'green' : 'blue'}
          size="sm"
        >
          {row.availability}
        </Badge>
      )
    },
    {
      header: 'Verification',
      key: 'verificationStatus',
      render: (row) => (
        <span className="text-3xs font-bold text-emerald-800 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          {row.verificationStatus}
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
            setSelectedAgronomist(row);
          }}
        >
          Profile
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Agronomists' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Scientific Agronomists
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Plant breeders, crop pathologists, and certified scientists auditing field trials.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setSelectedAgronomist(agronomists[0])}
        >
          Accredit Agronomist
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search agronomist name, specialization..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredAgronomists}
        onRowClick={(row) => setSelectedAgronomist(row)}
      />

      {/* Agronomist Profile Drawer */}
      <Drawer
        isOpen={Boolean(selectedAgronomist)}
        onClose={() => setSelectedAgronomist(null)}
        title={selectedAgronomist?.name}
        subtitle={selectedAgronomist?.degree}
        width="max-w-lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-2xs text-slate-500 font-mono">
              Scientific ID: {selectedAgronomist?.id}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAgronomist(null)}
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedAgronomist && (
          <div className="space-y-6 text-xs text-slate-700">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">Scientific Rating</span>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-700 mt-0.5">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{selectedAgronomist.rating} / 5.0</span>
                </div>
                <span className="text-3xs text-emerald-700 font-medium">
                  {selectedAgronomist.totalObservationsApproved} observations validated
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">Active Visits This Week</span>
                <span className="font-bold text-sm text-slate-900 mt-0.5 block">
                  {selectedAgronomist.activeVisitsThisWeek} Sites Scheduled
                </span>
                <span className="text-3xs text-blue-700 font-semibold">{selectedAgronomist.availability}</span>
              </div>
            </div>

            {/* Scientific Biography */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Academic Qualifications & Bio
              </h4>
              <p className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
                {selectedAgronomist.bio}
              </p>
            </div>

            {/* Specialization */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Core Specialization & Domains
              </h4>
              <div className="bg-emerald-50/80 p-3.5 rounded-lg border border-emerald-200 text-emerald-950 font-medium">
                {selectedAgronomist.specialization}
              </div>
            </div>

            {/* Assigned Trials */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Supervised Trial Protocols ({selectedAgronomist.assignedTrials.length})
              </h4>
              <div className="space-y-2">
                {selectedAgronomist.assignedTrials.map((tId) => (
                  <div
                    key={tId}
                    onClick={() => navigate(`/trials/${tId}`)}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer group"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#0F4A2A] block">{tId}</span>
                      <span className="text-slate-600 block mt-0.5">Primary Scientific Oversight</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0F4A2A] shrink-0" />
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
