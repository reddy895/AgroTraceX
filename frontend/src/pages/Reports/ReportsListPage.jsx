// src/pages/Reports/ReportsListPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockReports } from '../../data/reports';
import { FileCheck2, Search, Plus, Download, ExternalLink, Award } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ReportsListPage = () => {
  const [reports, setReports] = useState(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const filteredReports = reports.filter((r) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.trialId.toLowerCase().includes(q) ||
        r.crop.toLowerCase().includes(q) ||
        r.companyName.toLowerCase().includes(q) ||
        r.certificateNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns = [
    {
      header: 'Report ID & Certificate',
      key: 'id',
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#0F4A2A] block">{row.id}</span>
          <span className="text-3xs text-slate-500 font-mono">{row.certificateNumber}</span>
        </div>
      )
    },
    {
      header: 'Trial ID & Title',
      key: 'trialId',
      render: (row) => (
        <div className="max-w-[200px]">
          <span className="font-mono text-xs font-semibold text-slate-900 block">{row.trialId}</span>
          <span className="text-3xs text-slate-500 truncate block mt-0.5">{row.trialTitle}</span>
        </div>
      )
    },
    {
      header: 'Sponsor Company',
      key: 'companyName',
      render: (row) => (
        <span className="text-xs text-slate-700 font-medium truncate max-w-[140px] block">
          {row.companyName}
        </span>
      )
    },
    {
      header: 'Crop / Variety',
      key: 'crop',
      render: (row) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-900 block">{row.crop}</span>
          <span className="text-3xs text-slate-500">{row.variety}</span>
        </div>
      )
    },
    {
      header: 'Reviewed By',
      key: 'reviewedBy',
      render: (row) => (
        <span className="text-xs text-slate-700 truncate max-w-[160px] block">
          {row.reviewedBy}
        </span>
      )
    },
    {
      header: 'Date Certified',
      key: 'createdDate',
      render: (row) => (
        <span className="font-mono text-xs text-slate-600">{row.createdDate}</span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/reports/${row.id}`);
            }}
          >
            Inspect
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              showToast(`Exporting ${row.id} PDF dossier`, 'info');
            }}
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Reports' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Trial Performance Certification Dossiers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formal technical trial reports signed off by certified agronomists with statistical ANOVA yield analysis.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => {
            showToast('Opening dossier compiler for active trials...', 'info');
            navigate(`/reports/${reports[0].id}`);
          }}
        >
          Generate Dossier
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search report ID, certificate, crop..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredReports}
        onRowClick={(row) => navigate(`/reports/${row.id}`)}
      />
    </div>
  );
};
