// src/pages/Admin/AdminRequestsPage.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Building,
  Mail,
  Phone,
  Calendar,
  Search,
  Filter,
  Eye,
  FileText,
  User,
  ShieldCheck,
  RefreshCw,
  X
} from 'lucide-react';

export const AdminRequestsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('PENDING'); // PENDING | ALL | APPROVED | REJECTED
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
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
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

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
        showToast(`Approved workspace access for ${clientName}`, 'success');
        if (selectedRequest?.id === clientId) {
          setSelectedRequest((prev) => ({ ...prev, status: 'APPROVED' }));
        }
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

  const handleReject = async (clientId, clientName) => {
    setActionInProgress(clientId);
    try {
      const token = localStorage.getItem('agrotracex_token');
      const res = await fetch(`/api/admin/clients/${clientId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: 'Verification requirements not satisfied' })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        showToast(`Rejected access request for ${clientName}`, 'info');
        if (selectedRequest?.id === clientId) {
          setSelectedRequest((prev) => ({ ...prev, status: 'REJECTED' }));
        }
        fetchClients();
      } else {
        showToast(result.error || 'Failed to reject client', 'error');
      }
    } catch {
      showToast('Network error while rejecting client', 'error');
    } finally {
      setActionInProgress('');
    }
  };

  const filteredRequests = clients.filter((c) => {
    if (activeFilter !== 'ALL' && c.status !== activeFilter) return false;
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

  const pendingCount = clients.filter((c) => c.status === 'PENDING').length;

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-3xs font-mono font-bold uppercase text-white mb-2">
            <Clock className="w-3 h-3" />
            <span>ONBOARDING QUEUE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Client Workspace Requests
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Review applicant identities, organization affiliations, and justifications before granting platform access.
          </p>
        </div>

        <button
          onClick={fetchClients}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 ag-glass rounded-2xl border border-white/10">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 font-mono text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFilter('PENDING')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'PENDING'
                ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Pending</span>
            {pendingCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-3xs font-bold ${
                activeFilter === 'PENDING' ? 'bg-black text-white' : 'bg-white text-black'
              }`}>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'ALL'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Requests ({clients.length})
          </button>

          <button
            onClick={() => setActiveFilter('APPROVED')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'APPROVED'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setActiveFilter('REJECTED')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'REJECTED'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, org, email..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white/30 font-mono"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Requests List */}
      <Card
        title={`${activeFilter} Requests (${filteredRequests.length})`}
        subtitle="Select any request to inspect full applicant dossier and issue access authorization"
      >
        {filteredRequests.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Clock className="w-8 h-8 text-neutral-500 mx-auto" />
            <h4 className="text-sm font-bold text-white">No requests match this filter</h4>
            <p className="text-xs text-neutral-400">Try changing status filter or clearing your search.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.08]">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="py-5 first:pt-0 last:pb-0 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold text-white">{req.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-3xs font-mono font-bold border ${
                        req.status === 'APPROVED'
                          ? 'bg-white/15 text-white border-white/20'
                          : req.status === 'PENDING'
                          ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                          : req.status === 'REJECTED'
                          ? 'bg-neutral-900 text-neutral-300 border-neutral-700'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                      }`}
                    >
                      {req.status}
                    </span>
                    <span className="text-3xs font-mono text-neutral-500">
                      ID: {req.id}
                    </span>
                    <span className="text-3xs font-mono text-neutral-500">
                      Registered: {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-neutral-300 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-neutral-500" />
                      <strong className="text-white font-semibold">{req.organization}</strong>
                    </span>
                    <span className="text-neutral-400">{req.designation}</span>
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <Mail className="w-3.5 h-3.5 text-neutral-500" />
                      {req.email}
                    </span>
                    {req.phone && (
                      <span className="flex items-center gap-1.5 text-neutral-400">
                        <Phone className="w-3.5 h-3.5 text-neutral-500" />
                        {req.phone}
                      </span>
                    )}
                  </div>

                  {req.reason && (
                    <p className="text-xs text-neutral-400 italic bg-white/[0.02] border border-white/[0.05] p-2.5 rounded-xl">
                      "{req.reason}"
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 font-mono shrink-0 self-end lg:self-center">
                  <button
                    onClick={() => setSelectedRequest(req)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Dossier</span>
                  </button>

                  {req.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleReject(req.id, req.name)}
                        disabled={actionInProgress === req.id}
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => handleApprove(req.id, req.name)}
                        disabled={actionInProgress === req.id}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    </>
                  )}

                  {req.status === 'APPROVED' && (
                    <span className="text-3xs font-mono text-neutral-400 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                      Active In Workspace
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Full Request Dossier Modal / Drawer */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="max-w-xl w-full ag-glass rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white font-mono font-bold text-xs">
                  {selectedRequest.id.slice(-3)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {selectedRequest.name}
                  </h3>
                  <span className="text-3xs font-mono text-neutral-400">
                    Applicant Dossier Verification
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="bg-white/[0.02] border border-white/[0.08] p-4 rounded-2xl space-y-2.5">
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-neutral-400">Current Status:</span>
                  <span className="font-bold text-white">{selectedRequest.status}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-neutral-400">Organization:</span>
                  <span className="font-bold text-white">{selectedRequest.organization}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-neutral-400">Designation:</span>
                  <span className="text-white">{selectedRequest.designation}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-neutral-400">Work Email:</span>
                  <span className="text-white">{selectedRequest.email}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-neutral-400">Phone:</span>
                  <span className="text-white">{selectedRequest.phone || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Submission Date:</span>
                  <span className="text-white">{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-3xs uppercase tracking-wider text-neutral-400 mb-1">
                  Access Reason & Research Objective:
                </label>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-neutral-300 font-sans leading-relaxed text-xs">
                  {selectedRequest.reason || 'No specific objective provided.'}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 font-mono">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2.5 rounded-xl text-neutral-400 hover:text-white text-xs uppercase cursor-pointer"
              >
                Close
              </button>

              {selectedRequest.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => handleReject(selectedRequest.id, selectedRequest.name)}
                    disabled={actionInProgress === selectedRequest.id}
                    className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase cursor-pointer"
                  >
                    Reject Request
                  </button>

                  <button
                    onClick={() => handleApprove(selectedRequest.id, selectedRequest.name)}
                    disabled={actionInProgress === selectedRequest.id}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                  >
                    Approve & Grant Workspace Access
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequestsPage;
