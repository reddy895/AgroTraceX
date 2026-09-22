// src/components/landing/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AgroTraceXLogo } from '../shared/AgroTraceXLogo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#020202] pt-16 pb-12 text-neutral-400 text-xs">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 sm:gap-12 pb-14 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <AgroTraceXLogo size="lg" showTagline={false} />
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Autonomous agricultural trial intelligence platform connecting seed breeding genetics, verified plot farmers, mobile field audits, and certified spectroscopy laboratories.
            </p>
            <div className="flex items-center gap-3 text-3xs font-mono tracking-widest text-neutral-300 pt-1">
              <span>TRACE</span>
              <span>•</span>
              <span>VALIDATE</span>
              <span>•</span>
              <span>GROW</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-2xs font-bold uppercase tracking-[0.14em] text-white font-mono">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/trials" className="hover:text-white transition-colors">
                  Field Trials
                </Link>
              </li>
              <li>
                <Link to="/seed-lots" className="hover:text-white transition-colors">
                  Seed Lots & Genetics
                </Link>
              </li>
              <li>
                <Link to="/fields" className="hover:text-white transition-colors">
                  Geofenced Plots
                </Link>
              </li>
              <li>
                <Link to="/observations" className="hover:text-white transition-colors">
                  Phenotype Observations
                </Link>
              </li>
              <li>
                <Link to="/samples" className="hover:text-white transition-colors">
                  Lab Spectroscopy
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-white transition-colors">
                  ANOVA Dossiers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-2xs font-bold uppercase tracking-[0.14em] text-white font-mono">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/companies" className="hover:text-white transition-colors">
                  Seed R&D Enterprises
                </Link>
              </li>
              <li>
                <Link to="/farmers" className="hover:text-white transition-colors">
                  Verified Farmer Network
                </Link>
              </li>
              <li>
                <Link to="/agronomists" className="hover:text-white transition-colors">
                  Agronomic Scientists
                </Link>
              </li>
              <li>
                <Link to="/field-officer" className="hover:text-white transition-colors">
                  Field Officer Mobile Flow
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-white transition-colors">
                  Executive Terminal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Standards & Trust */}
          <div className="space-y-3">
            <h4 className="text-2xs font-bold uppercase tracking-[0.14em] text-white font-mono">
              Compliance
            </h4>
            <ul className="space-y-2.5 font-mono text-3xs text-neutral-400">
              <li>ISO 9001:2015 Registered</li>
              <li>OECD Seed Schemes Aligned</li>
              <li>Good Laboratory Practice (GLP)</li>
              <li>Sub-Meter Cadastral Accuracy</li>
              <li>Cryptographic Barcode Custody</li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-3xs font-mono text-neutral-500">
          <div>
            © {currentYear} AgroTraceX Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-neutral-300 transition-colors">
              Terms of Protocol Service
            </a>
            <span className="text-neutral-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              SYSTEM OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
