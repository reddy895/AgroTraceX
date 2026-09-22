// src/pages/Admin/AdminClientsPage.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  Search,
  RefreshCw,
  Ban,
  CheckCircle2,
  XCircle,
  Building,
  Mail,
  Phone,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const AdminClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionInProgress, setActionInProgress] = useState('');

  const { showToast } = useToast();

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('agrotracex_token');
      const res = await fetch('/api/admin/clients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setClients(json.clients || []);
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleRevoke = async (clientId, clientName) => {
    if (!window.confirm(`Are you sure you want to revoke workspace access for ${clientName}? They will immediately lose platform access.`)) {
      return;
    }
    setActionInProgress(clientId);
    try {
      const token = localStorage.getItem('agrotracex_token');
      const res = await fetch(`/api/admin/clients/${clientId}/revoke`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: 'Admin revoked workspace credentials' })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        showToast(`Revoked platform access for ${clientName}`, 'info');
        fetchClients();
      } else {
        showToast(result.error || 'Failed to revoke access', 'error');
      }
    } catch {
      showToast('Network error while revoking client access', 'error');
    } finally {
      setActionInProgress('');
    }
  };

  const handleApprove = async (clientId, clientName) => {
    setActionInProgress(clientId);
    try {
      const token = localStorage.getItem('agrotracex_token');
      const res = await fetch(`/api/admin/clients/${clientId}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (res.ok && result.success) {
        showToast(`Granted workspace access to ${clientName}`, 'success');
        fetchClients();
      } else {
        showToast(result.error || 'Failed to approve client', 'error');
      }
    } catch {
      showToast('Network error while approving client', 'error');
    } finally {
      setActionInProgress('');
    }
  };

  const filteredClients = clients.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.organization.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const columns = [
    {
      header: 'Client & ID',
      key: 'name',
      render: (row) => (
        <div className="space-y-0.5">
          <span className="font-bold text-xs text-white block">{row.name}</span>
          <span className="text-3xs font-mono text-neutral-400 block">ID: {row.id}</span>
        </div>
      )
    },
    {
      header: 'Organization & Role',
      key: 'organization',
      render: (row) => (
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-neutral-200 block truncate max-w-[180px]">
            {row.organization}
          </span>
          <span className="text-3xs text-neutral-400 block">{row.designation}</span>
        </div>
      )
    },
    {
      header: 'Contact Info',
      key: 'email',
      render: (row) => (
        <div className="space-y-0.5 font-mono text-3xs">
          <span className="text-neutral-300 block">{row.email}</span>
          {row.phone && <span className="text-neutral-500 block">{row.phone}</span>}
        </div>
      )
    },
    {
      header: 'Joined Date',
      key: 'createdAt',
      render: (row) => (
        <span className="text-3xs font-mono text-neutral-400">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      )
    },
    {
      header: 'Access Status',
      key: 'status',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-3xs font-mono font-bold border ${
            row.status === 'APPROVED'
              ? 'bg-white/15 text-white border-white/20'
              : row.status === 'PENDING'
              ? 'bg-white text-black border-white'
              : row.status === 'REJECTED'
              ? 'bg-neutral-900 text-neutral-300 border-neutral-700'
              : 'bg-neutral-900 text-neutral-400 border-neutral-800'
          }`}
        >
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      key: 'action',
      render: (row) => (
        <div className="flex items-center gap-2 font-mono">
          {row.status === 'APPROVED' ? (
            <button
              onClick={() => handleRevoke(row.id, row.name)}
              disabled={actionInProgress === row.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-3xs font-bold uppercase transition-all cursor-pointer disabled:opacity-50"
              title="Revoke client access immediately"
            >
              <Ban className="w-3 h-3 text-neutral-400" />
              <span>Revoke Access</span>
            </button>
          ) : row.status === 'PENDING' ? (
            <button
              onClick={() => handleApprove(row.id, row.name)}
              disabled={actionInProgress === row.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-black hover:bg-neutral-200 text-3xs font-bold uppercase transition-all cursor-pointer shadow-[0_0_10px_rgba(255,255,255,0.2)] disabled:opacity-50"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Approve</span>
            </button>
          ) : (
            <button
              onClick={() => handleApprove(row.id, row.name)}
              disabled={actionInProgress === row.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-3xs font-bold uppercase transition-all cursor-pointer disabled:opacity-50"
              title="Re-activate client account"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Re-Approve</span>
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-3xs font-mono font-bold uppercase text-white mb-2">
            <Users className="w-3 h-3" />
            <span>ACCESS GOVERNANCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Client Accounts Directory
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Audit registered organizations, manage access levels, and immediately revoke or re-approve workspace access.
          </p>
        </div>

        <button
          onClick={fetchClients}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Directory</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 ag-glass rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs overflow-x-auto no-scrollbar">
          {['ALL', 'APPROVED', 'PENDING', 'REJECTED', 'REVOKED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clients..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white/30 font-mono"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Clients Table Card */}
      <Card
        title={`Registered Clients (${filteredClients.length})`}
        subtitle="Manage authorization state per client entity"
      >
        <Table columns={columns} data={filteredClients} loading={loading} />
      </Card>
    </div>
  );
};

export default AdminClientsPage;
