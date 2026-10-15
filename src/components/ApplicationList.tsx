import React from 'react';
import type { Application } from '../types/application';
import { ApplicationCard } from './ApplicationCard';
import { Inbox, SearchX, Plus, Database } from 'lucide-react';
import './ApplicationList.css';

interface ApplicationListProps {
  applications: Application[];
  totalApplicationsCount: number;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
  onOpenAddModal: () => void;
  onLoadSampleData: () => void;
  onClearFilters: () => void;
}

export const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  totalApplicationsCount,
  onEdit,
  onDelete,
  onOpenAddModal,
  onLoadSampleData,
  onClearFilters,
}) => {
  // Scenario 1: Tracker has 0 applications saved in localStorage
  if (totalApplicationsCount === 0) {
    return (
      <div className="empty-state-card" role="region" aria-label="No applications found">
        <div className="empty-icon-wrapper" aria-hidden="true">
          <Inbox size={36} />
        </div>
        <h3 className="empty-title">Your application tracker is empty</h3>
        <p className="empty-description">
          Start tracking your job search by adding your first application, or load
          our curated sample data to explore all features immediately.
        </p>
        <div className="empty-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenAddModal}
            aria-label="Add your first job application"
          >
            <Plus size={18} />
            <span>Add First Application</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onLoadSampleData}
            aria-label="Load sample applications to test the app"
          >
            <Database size={16} />
            <span>Load Sample Data</span>
          </button>
        </div>
      </div>
    );
  }

  // Scenario 2: Active search or filter returned 0 matching applications
  if (applications.length === 0) {
    return (
      <div className="empty-state-card" role="region" aria-label="No matching applications found">
        <div className="empty-icon-wrapper" aria-hidden="true">
          <SearchX size={36} />
        </div>
        <h3 className="empty-title">No matching applications found</h3>
        <p className="empty-description">
          We couldn&apos;t find any applications matching your current search query or
          status filter. Try adjusting your search keywords.
        </p>
        <div className="empty-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClearFilters}
            aria-label="Clear active filters"
          >
            <span>Reset Search & Filters</span>
          </button>
        </div>
      </div>
    );
  }

  // Scenario 3: Display list of cards in a responsive grid
  return (
    <div
      className="applications-grid"
      role="region"
      aria-label={`List of ${applications.length} applications`}
    >
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          application={app}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
