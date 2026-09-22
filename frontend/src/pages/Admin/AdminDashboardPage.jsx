// src/pages/Admin/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/ui/Card';
import {
  Clock,
  UserCheck,
  UserX,
  Users,
  Activity,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Ban,
  ArrowRight,
  Eye,
  RefreshCw,
  Building,
  Mail,
  Phone,
  Calendar,
  FileText
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const [data, setData] = useState({
    metrics: {
      totalClients: 0,
      pendingCount: 0,
      approvedCount: 0,
      rejectedCount: 0,
      revokedCount: 0,
      activeCount: 0,
      recentRegistrationsCount: 0,
      accessChangesCount: 0
    },
    pendingRequests: [],
    recentActivities: []
  });

  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionInProgress, setActionInProgress] = useState('');

  const { showToast } = useToast();
  const navigate = useNavigate();

  const fetchOverview = async () => {
    try {
      const token = localStorage.getItem('agrotracex_token');
      const res = await fetch('/api/admin/overview', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching admin overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
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
        setSelectedRequest(null);
        fetchOverview();
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
        body: JSON.stringify({ reason: 'Verification criteria not satisfied' })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        showToast(`Rejected access request for ${clientName}`, 'info');
        setSelectedRequest(null);
        fetchOverview();
      } else {
        showToast(result.error || 'Failed to reject client', 'error');
      }
    } catch {
      showToast('Network error while rejecting client', 'error');
    } finally {
      setActionInProgress('');
    }
  };

  const metrics = data.metrics;

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-3xs font-mono font-bold uppercase text-white mb-2">
            <span>OPERATIONAL GOVERNANCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Administrator Command Center
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5 leading-normal">
            Prioritize pending client onboarding requests, manage access states, and audit system events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOverview}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh State</span>
          </button>
        </div>
      </div>

      {/* 6 Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Metric 1: Pending Requests (Highlighted priority) */}
        <div className="p-5 rounded-2xl bg-white/[0.07] border border-white/25 shadow-[0_0_25px_rgba(255,255,255,0.06)] flex flex-col justify-between min-h-[128px]">
          <div className="flex items-start justify-between">
            <span className="text-3xs font-mono uppercase tracking-wider text-white font-bold">
              Pending Requests
            </span>
            <div className="p-2 rounded-xl bg-white text-black shrink-0 shadow-[0_0_12px_rgba(255,255,255,0.3)]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold font-mono text-white">
              {metrics.pendingCount}
            </span>
            {metrics.pendingCount > 0 && (
              <span className="text-3xs font-mono uppercase bg-white text-black font-bold px-2 py-0.5 rounded-full">
                Action Req.
              </span>
            )}
          </div>
          <span className="text-3xs font-mono text-neutral-400 mt-1 block">
            Awaiting verification
          </span>
        </div>

        {/* Metric 2: Approved Clients */}
        <div className="p-5 rounded-2xl ag-glass border border-white/10 flex flex-col justify-between min-h-[128px]">
          <div className="flex items-start justify-between">
            <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400">
              Approved Clients
            </span>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold font-mono text-white">
              {metrics.approvedCount}
            </span>
          </div>
          <span className="text-3xs font-mono text-neutral-400 mt-1 block">
            Active workspace access
          </span>
        </div>

        {/* Metric 3: Rejected Clients */}
        <div className="p-5 rounded-2xl ag-glass border border-white/10 flex flex-col justify-between min-h-[128px]">
          <div className="flex items-start justify-between">
            <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400">
              Rejected Clients
            </span>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 shrink-0">
              <UserX className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold font-mono text-neutral-300">
              {metrics.rejectedCount}
            </span>
          </div>
          <span className="text-3xs font-mono text-neutral-400 mt-1 block">
            Declined requests
          </span>
        </div>

        {/* Metric 4: Active Clients */}
        <div className="p-5 rounded-2xl ag-glass border border-white/10 flex flex-col justify-between min-h-[128px]">
          <div className="flex items-start justify-between">
            <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400">
              Active Clients
            </span>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white shrink-0">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold font-mono text-white">
              {metrics.activeCount}
            </span>
          </div>
          <span className="text-3xs font-mono text-neutral-400 mt-1 block">
            Operating trials
          </span>
        </div>

        {/* Metric 5: Recently Registered (7d) */}
        <div className="p-5 rounded-2xl ag-glass border border-white/10 flex flex-col justify-between min-h-[128px]">
          <div className="flex items-start justify-between">
            <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400">
              Recent (7d)
            </span>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold font-mono text-white">
              {metrics.recentRegistrationsCount}
            </span>
          </div>
          <span className="text-3xs font-mono text-neutral-400 mt-1 block">
            New registrations
          </span>
        </div>

        {/* Metric 6: Access Changes */}
        <div className="p-5 rounded-2xl ag-glass border border-white/10 flex flex-col justify-between min-h-[128px]">
          <div className="flex items-start justify-between">
            <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400">
              Access Changes
            </span>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white shrink-0">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold font-mono text-white">
              {metrics.accessChangesCount}
            </span>
          </div>
          <span className="text-3xs font-mono text-neutral-400 mt-1 block">
            Status audit log
          </span>
        </div>
      </div>

      {/* Main Section: PENDING CLIENT REQUESTS */}
      <Card
        title="Pending Client Workspace Requests"
        subtitle="Review applicant credentials and authorize or decline workspace access"
        action={
          <Link
            to="/admin/requests"
            className="text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1 font-semibold"
          >
            <span>View All Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      >
        {data.pendingRequests.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-bold text-white">All Client Requests Processed</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              There are no pending client registrations awaiting approval. New requests will appear here immediately.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.08]">
            {data.pendingRequests.map((req) => (
              <div
                key={req.id}
                className="py-5 first:pt-0 last:pb-0 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Client Dossier Summary */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold text-white">{req.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-3xs font-mono font-bold bg-white/15 text-white border border-white/20">
                      PENDING REVIEW
                    </span>
                    <span className="text-3xs font-mono text-neutral-500">
                      Registered: {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-neutral-300 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-neutral-500" />
                      <strong className="font-semibold text-white">{req.organization}</strong>
                    </span>
                    <span className="text-neutral-400">Designation: {req.designation}</span>
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
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-xs text-neutral-300 leading-relaxed">
                      <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                        Access Justification:
                      </span>
                      {req.reason}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center font-mono">
                  <button
                    onClick={() => handleReject(req.id, req.name)}
                    disabled={actionInProgress === req.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => handleApprove(req.id, req.name)}
                    disabled={actionInProgress === req.id}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)] disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Two Column Bottom Row: Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Audit Activities (2 Cols) */}
        <div className="lg:col-span-2">
          <Card
            title="Recent Audit Trail & Access Events"
            subtitle="Immutable chronological log of registrations, approvals, and credential events"
            action={
              <Link
                to="/admin/activity"
                className="text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1 font-semibold"
              >
                <span>Full Audit Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <div className="space-y-3">
              {data.recentActivities.slice(0, 5).map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4 text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">{act.title}</div>
                      <div className="text-3xs text-neutral-400 mt-0.5 line-clamp-1">
                        {act.description}
                      </div>
                    </div>
                  </div>
                  <span className="text-3xs text-neutral-500 whitespace-nowrap">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Directory Quick Navigation (1 Col) */}
        <div>
          <Card
            title="Directory Operations"
            subtitle="Manage platform accounts"
          >
            <div className="space-y-3">
              <Link
                to="/admin/clients"
                className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-bold text-white text-xs">All Client Directory</div>
                  <div className="text-3xs text-neutral-400 mt-0.5">
                    Search & revoke active client accounts
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/admin/requests"
                className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-bold text-white text-xs">Pending Requests Queue</div>
                  <div className="text-3xs text-neutral-400 mt-0.5">
                    Filter & inspect applicant dossiers
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/admin/settings"
                className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-bold text-white text-xs">System Settings</div>
                  <div className="text-3xs text-neutral-400 mt-0.5">
                    Security policies & verification rules
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
