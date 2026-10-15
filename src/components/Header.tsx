import React from 'react';
import { Briefcase, Plus, Database, RotateCcw } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onOpenAddModal: () => void;
  onLoadSampleData: () => void;
  onClearAll: () => void;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddModal,
  onLoadSampleData,
  onClearAll,
  totalCount,
}) => {
  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <div className="brand-group">
          <div className="brand-icon-wrapper" aria-hidden="true">
            <Briefcase className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <h1 className="brand-title">ApplyTrack</h1>
              <span className="brand-badge">Portfolio Demo</span>
            </div>
            <p className="brand-tagline">
              Job & Internship Application Tracker
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-sample"
            onClick={onLoadSampleData}
            title="Load curated sample applications to explore the dashboard"
            aria-label="Load curated sample applications"
          >
            <Database size={16} />
            <span>Load Sample Data</span>
          </button>

          {totalCount > 0 && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClearAll}
              title="Clear all saved applications"
              aria-label="Clear all applications"
            >
              <RotateCcw size={15} />
              <span className="btn-text-desktop">Reset</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenAddModal}
            aria-label="Add new application"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Add Application</span>
          </button>
        </div>
      </div>
    </header>
  );
};
