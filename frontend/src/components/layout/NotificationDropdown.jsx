// src/components/layout/NotificationDropdown.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle2, Check, ExternalLink } from 'lucide-react';
import { mockAlerts } from '../../data/alerts';

export const NotificationDropdown = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = alerts.filter((a) => a.unread).length;

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, unread: false })));
  };

  const markSingleRead = (id) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, unread: false } : a)));
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'danger':
        return <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-3xs font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-4 py-3 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-3xs font-semibold bg-red-100 text-red-800">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-2xs text-[#0F4A2A] hover:underline font-medium cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
              {alerts.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  No notifications to display
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3.5 transition-colors hover:bg-slate-50 flex items-start gap-3 ${
                      alert.unread ? 'bg-slate-50/50' : 'opacity-80'
                    }`}
                  >
                    <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-2xs font-semibold uppercase tracking-wider text-slate-400">
                          {alert.category}
                        </span>
                        <span className="text-3xs text-slate-400">{alert.timeAgo}</span>
                      </div>
                      <h5 className="text-xs font-semibold text-slate-900 mt-0.5">{alert.title}</h5>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                        {alert.message}
                      </p>
                      {alert.link && (
                        <Link
                          to={alert.link}
                          onClick={() => {
                            markSingleRead(alert.id);
                            setIsOpen(false);
                          }}
                          className="inline-flex items-center gap-1 text-2xs font-semibold text-[#0F4A2A] hover:underline mt-1.5"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    {alert.unread && (
                      <button
                        onClick={() => markSingleRead(alert.id)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-slate-50 text-center">
              <Link
                to="/trials"
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-slate-700 hover:text-[#0F4A2A]"
              >
                View all trial operational alerts →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
