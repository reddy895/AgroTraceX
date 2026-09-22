// src/pages/Admin/AdminActivityPage.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import {
  Activity,
  CheckCircle2,
  XCircle,
  Ban,
  Clock,
  UserPlus,
  RefreshCw,
  Search,
  ShieldCheck
} from 'lucide-react';

export const AdminActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('agrotracex_token');
      const res = await fetch('/api/admin/activity', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setActivities(json.activities || []);
      }
    } catch (err) {
      console.error('Failed to fetch activity log:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((act) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      act.title.toLowerCase().includes(q) ||
      act.description.toLowerCase().includes(q) ||
      act.actor?.toLowerCase().includes(q)
    );
  });

  const getEventIcon = (type) => {
    switch (type) {
      case 'ACCESS_APPROVED':
        return <CheckCircle2 className="w-4 h-4 text-white" />;
      case 'ACCESS_REJECTED':
        return <XCircle className="w-4 h-4 text-neutral-300" />;
      case 'ACCESS_REVOKED':
        return <Ban className="w-4 h-4 text-neutral-400" />;
      case 'USER_REGISTRATION':
        return <UserPlus className="w-4 h-4 text-white" />;
      default:
        return <Activity className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-3xs font-mono font-bold uppercase text-white mb-2">
            <Activity className="w-3 h-3" />
            <span>IMMUTABLE AUDIT TRAIL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            System Security & Access Log
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Chronological audit log tracking client registrations, approvals, rejections, and access changes.
          </p>
        </div>

        <button
          onClick={fetchActivities}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Log</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 ag-glass rounded-2xl border border-white/10 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit records..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white/30 font-mono"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
        </div>
        <span className="text-3xs font-mono text-neutral-500">
          Total {filteredActivities.length} Events Logged
        </span>
      </div>

      {/* Activity Timeline */}
      <Card
        title="Audit Events"
        subtitle="Cryptographically verified event timestamps"
      >
        {filteredActivities.length === 0 ? (
          <div className="py-12 text-center text-neutral-400 text-xs">
            No activity logs match your filter criteria.
          </div>
        ) : (
          <div className="divide-y divide-white/[0.08]">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4 font-mono text-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
                    {getEventIcon(act.type)}
                  </div>
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{act.title}</span>
                      <span className="px-2 py-0.2 rounded-full bg-white/10 border border-white/15 text-3xs text-neutral-300">
                        {act.type}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                      {act.description}
                    </p>
                    <div className="text-3xs text-neutral-500 flex items-center gap-4 pt-0.5">
                      <span>Actor: {act.actor || 'System'}</span>
                      {act.userId && <span>Target ID: {act.userId}</span>}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right text-3xs text-neutral-500">
                  <div>{new Date(act.timestamp).toLocaleDateString()}</div>
                  <div>{new Date(act.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminActivityPage;
