// src/pages/Companies/CompaniesListPage.jsx
import React, { useState } from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Drawer } from '../../components/ui/Drawer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { mockCompanies } from '../../data/companies';
import {
  Building2,
  Search,
  Plus,
  Mail,
  Phone,
  Globe,
  CreditCard,
  FlaskConical,
  Package,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CompaniesListPage = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  const filteredCompanies = companies.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.contactPerson.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns = [
    {
      header: 'Company Name & ID',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F4A2A] font-bold text-xs flex items-center justify-center border border-emerald-100 shrink-0">
            {row.logoText}
          </div>
          <div>
            <span className="font-semibold text-xs text-slate-900 block">{row.name}</span>
            <span className="font-mono text-3xs text-slate-400">{row.id}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Industry Sector',
      key: 'industry',
      render: (row) => (
        <span className="text-xs text-slate-700 truncate max-w-[180px] block">
          {row.industry}
        </span>
      )
    },
    {
      header: 'Key Contact',
      key: 'contactPerson',
      render: (row) => (
        <div className="text-xs">
          <span className="font-medium text-slate-900 block">{row.contactPerson}</span>
          <span className="text-3xs text-slate-500">{row.email}</span>
        </div>
      )
    },
    {
      header: 'Active Trials',
      key: 'activeTrials',
      render: (row) => (
        <span className="font-mono text-xs font-bold text-[#0F4A2A]">
          {row.activeTrials} in ground ({row.completedTrials} completed)
        </span>
      )
    },
    {
      header: 'Seed Lots',
      key: 'seedLotsCount',
      render: (row) => (
        <span className="font-mono text-xs text-slate-800">{row.seedLotsCount} Lots</span>
      )
    },
    {
      header: 'Subscription Tier',
      key: 'tier',
      render: (row) => (
        <Badge variant="blue" size="sm">
          {row.tier}
        </Badge>
      )
    },
    {
      header: 'Account Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
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
            setSelectedCompany(row);
          }}
        >
          Company Profile
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Companies' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Sponsoring Agri-Science Companies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enterprise seed genetics and plant biotechnology client accounts with dedicated trial partitions.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setSelectedCompany(companies[0])}
        >
          Add Company Account
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search company name, industry, contact..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredCompanies}
        onRowClick={(row) => setSelectedCompany(row)}
      />

      {/* Company Profile Drawer */}
      <Drawer
        isOpen={Boolean(selectedCompany)}
        onClose={() => setSelectedCompany(null)}
        title={selectedCompany?.name}
        subtitle={`${selectedCompany?.id} • ${selectedCompany?.industry}`}
        width="max-w-xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-2xs text-slate-500 font-mono">
              Billing Status: {selectedCompany?.billingStatus}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCompany(null)}
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedCompany && (
          <div className="space-y-6 text-xs text-slate-700">
            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">Active Trial Sites</span>
                <span className="font-bold text-base text-[#0F4A2A] mt-0.5 block">
                  {selectedCompany.activeTrials} Active
                </span>
                <span className="text-3xs text-slate-500">{selectedCompany.completedTrials} historical certified</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">Registered Seed Lots</span>
                <span className="font-bold text-base text-slate-900 mt-0.5 block">
                  {selectedCompany.seedLotsCount} Cultivars
                </span>
                <span className="text-3xs text-emerald-700 font-medium">Full chain of custody</span>
              </div>
            </div>

            {/* Corporate & Contacts */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Authorized R&D Point of Contact
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Representative:</span>
                  <span className="font-semibold text-slate-900">{selectedCompany.contactPerson}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-mono text-slate-900">{selectedCompany.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-mono text-slate-900">{selectedCompany.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Jurisdiction:</span>
                  <span className="text-slate-900">{selectedCompany.country}</span>
                </div>
              </div>
            </div>

            {/* Commercial & SLA Billing Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                SLA & Billing Summary
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Contract Tier:</span>
                  <Badge variant="blue" size="sm">{selectedCompany.tier}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Account Standing:</span>
                  <span className="text-emerald-700 font-semibold">{selectedCompany.billingStatus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Telemetry SLA:</span>
                  <span className="font-medium text-slate-800">4-Hour Agronomist Audit Turnaround</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
