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

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white text-black text-3xs font-bold flex items-center justify-center font-mono shadow-[0_0_8px_#ffffff] animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0a0a0a]/98 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-50 overflow-hidden divide-y divide-white/[0.08] backdrop-blur-2xl text-white">
            {/* Header */}
            <div className="px-4 py-3 bg-white/[0.03] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-3xs font-mono font-semibold bg-white/10 text-white border border-white/20">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-3xs font-mono text-neutral-400 hover:text-white cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[360px] overflow-y-auto divide-y divide-white/[0.05]">
              {alerts.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-400 font-mono">
                  No notifications to display
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3.5 transition-colors hover:bg-white/[0.04] flex items-start gap-3 ${
                      alert.unread ? 'bg-white/[0.02]' : 'opacity-70'
                    }`}
                  >
                    <div className="mt-0.5">
                      <span className="block w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-3xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                          {alert.category}
                        </span>
                        <span className="text-3xs font-mono text-neutral-500">{alert.timeAgo}</span>
                      </div>
                      <h5 className="text-xs font-semibold text-white mt-0.5">{alert.title}</h5>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed line-clamp-2">
                        {alert.message}
                      </p>
                      {alert.link && (
                        <Link
                          to={`/platform${alert.link}`}
                          onClick={() => {
                            markSingleRead(alert.id);
                            setIsOpen(false);
                          }}
                          className="inline-flex items-center gap-1 text-3xs font-mono font-semibold text-white hover:underline mt-1.5"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    {alert.unread && (
                      <button
                        onClick={() => markSingleRead(alert.id)}
                        className="p-1 rounded text-neutral-500 hover:text-white cursor-pointer"
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
            <div className="p-2.5 bg-white/[0.02] text-center">
              <Link
                to="/platform/trials"
                onClick={() => setIsOpen(false)}
                className="text-3xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white"
              >
                View all operational alerts →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
