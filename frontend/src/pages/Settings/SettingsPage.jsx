// src/pages/Settings/SettingsPage.jsx
import React, { useState } from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Settings, Shield, Bell, Navigation, Database, Check } from 'lucide-react';

export const SettingsPage = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [gpsToleranceMeters, setGpsToleranceMeters] = useState('4.0');
  const [offlineSyncInterval, setOfflineSyncInterval] = useState('15');
  const [notifyOverdue, setNotifyOverdue] = useState(true);
  const [notifyDeviation, setNotifyDeviation] = useState(true);
  const [notifyLabResults, setNotifyLabResults] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Platform operational settings saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Breadcrumb items={[{ label: 'Settings' }]} />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Platform Configuration & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Adjust GPS verification geofence tolerance, telemetry notification triggers, and offline cache parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile Card */}
        <Card
          title="Current User Profile"
          subtitle="Authorized credentials and role assignment"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <Input
              label="Full Name"
              value={currentUser.name}
              disabled
            />
            <Input
              label="Email Address"
              value={currentUser.email}
              disabled
            />
            <Input
              label="Active Persona Role"
              value={currentUser.role}
              disabled
            />
            <Input
              label="Assigned Organization"
              value={currentUser.company}
              disabled
            />
          </div>
        </Card>

        {/* GPS & Geofence Standards */}
        <Card
          title="Field Telemetry & GPS Geofence Standards"
          subtitle="Precision tolerances required for scientific observation sign-off"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <Input
              label="Maximum Allowable GPS Drift (Meters)"
              type="number"
              step="0.5"
              value={gpsToleranceMeters}
              onChange={(e) => setGpsToleranceMeters(e.target.value)}
              helperText="Observations beyond this distance from boundary will trigger a protocol alert."
            />

            <Select
              label="Offline Local Sync Frequency"
              value={offlineSyncInterval}
              onChange={(e) => setOfflineSyncInterval(e.target.value)}
              options={[
                { value: '5', label: 'Every 5 Minutes (High Priority)' },
                { value: '15', label: 'Every 15 Minutes (Standard Field)' },
                { value: '60', label: 'Hourly (Low Bandwidth Mode)' }
              ]}
              helperText="Frequency of background cache flushing when cellular connectivity is intermittent."
            />
          </div>
        </Card>

        {/* Notification Rules */}
        <Card
          title="Operational Notification Triggers"
          subtitle="Automated alerts dispatched to agronomists and operations managers"
        >
          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyOverdue}
                onChange={(e) => setNotifyOverdue(e.target.checked)}
                className="mt-0.5 rounded text-[#0F4A2A] focus:ring-[#0F4A2A]"
              />
              <div>
                <span className="font-semibold text-slate-900 block">Observation Overdue Warnings</span>
                <span className="text-3xs text-slate-500">Alert lead agronomist when phenological window passes +24 hours without log.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyDeviation}
                onChange={(e) => setNotifyDeviation(e.target.checked)}
                className="mt-0.5 rounded text-[#0F4A2A] focus:ring-[#0F4A2A]"
              />
              <div>
                <span className="font-semibold text-slate-900 block">Protocol Deviation Alerts</span>
                <span className="text-3xs text-slate-500">Immediately flag waterlogging, unexpected pesticide sprays, or severe pest thresholds.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyLabResults}
                onChange={(e) => setNotifyLabResults(e.target.checked)}
                className="mt-0.5 rounded text-[#0F4A2A] focus:ring-[#0F4A2A]"
              />
              <div>
                <span className="font-semibold text-slate-900 block">Laboratory Result Notifications</span>
                <span className="text-3xs text-slate-500">Notify seed company client when NIR spectroscopy certificates are signed.</span>
              </div>
            </label>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md">
            Save Platform Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
