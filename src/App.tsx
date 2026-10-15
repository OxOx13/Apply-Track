import React, { useState, useEffect, useMemo } from 'react';
import type {
  Application,
  ApplicationFormData,
  StatusFilter,
  SortOption,
} from './types/application';
import {
  loadApplicationsFromStorage,
  saveApplicationsToStorage,
  resetStorageToSampleData,
  clearAllStorageApplications,
} from './services/storage';
import { Header } from './components/Header';
import { DashboardMetrics } from './components/DashboardMetrics';
import { FilterBar } from './components/FilterBar';
import { ApplicationList } from './components/ApplicationList';
import { ApplicationModal } from './components/ApplicationModal';
import { ConfirmModal } from './components/ConfirmModal';
import { Toast, type ToastMessage } from './components/Toast';
import './App.css';

export const App: React.FC = () => {
  // Main application state persisted in localStorage
  const [applications, setApplications] = useState<Application[]>(() => {
    return loadApplicationsFromStorage();
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  // Modal management state
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);

  // Confirmation modal state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, description?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, description };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Persist to localStorage whenever applications state changes
  useEffect(() => {
    saveApplicationsToStorage(applications);
  }, [applications]);

  // Add application handler
  const handleCreateApplication = (formData: ApplicationFormData) => {
    const now = new Date().toISOString();
    const newApp: Application = {
      ...formData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `app-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };

    setApplications((prev) => [newApp, ...prev]);
    setIsFormModalOpen(false);
    addToast('success', 'Application added successfully', `${newApp.role} at ${newApp.company}`);
  };

  // Edit application handler
  const handleUpdateApplication = (formData: ApplicationFormData) => {
    if (!editingApplication) return;

    const now = new Date().toISOString();
    const updatedApp: Application = {
      ...editingApplication,
      ...formData,
      updatedAt: now,
    };

    setApplications((prev) =>
      prev.map((app) => (app.id === editingApplication.id ? updatedApp : app))
    );
    setEditingApplication(null);
    setIsFormModalOpen(false);
    addToast('success', 'Application updated', `Changes saved for ${updatedApp.company}`);
  };

  // Open Edit Modal
  const handleOpenEdit = (application: Application) => {
    setEditingApplication(application);
    setIsFormModalOpen(true);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingApplication(null);
    setIsFormModalOpen(true);
  };

  // Delete application handler with confirmation
  const handleRequestDelete = (application: Application) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Application',
      message: `Are you sure you want to delete your application for ${application.role} at ${application.company}? This action cannot be undone.`,
      confirmLabel: 'Delete Application',
      onConfirm: () => {
        setApplications((prev) => prev.filter((app) => app.id !== application.id));
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        addToast('info', 'Application deleted', `${application.company} was removed from your tracker`);
      },
    });
  };

  // Load sample data option
  const handleLoadSampleData = () => {
    const sample = resetStorageToSampleData();
    setApplications(sample);
    setStatusFilter('All');
    setSearchQuery('');
    addToast('info', 'Sample data loaded', `${sample.length} realistic job applications ready to explore`);
  };

  // Reset / Clear all applications with confirmation
  const handleRequestClearAll = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Reset Tracker',
      message: 'Are you sure you want to remove all saved applications? You can always reload the sample data at any time.',
      confirmLabel: 'Clear All',
      onConfirm: () => {
        const cleared = clearAllStorageApplications();
        setApplications(cleared);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        addToast('info', 'Tracker cleared', 'All applications have been removed');
      },
    });
  };

  // Filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    return applications
      .filter((app) => {
        // Status filter
        if (statusFilter !== 'All' && app.status !== statusFilter) {
          return false;
        }

        // Search query (company or role)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchCompany = app.company.toLowerCase().includes(query);
          const matchRole = app.role.toLowerCase().includes(query);
          const matchNotes = app.notes.toLowerCase().includes(query);
          if (!matchCompany && !matchRole && !matchNotes) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return b.appliedDate.localeCompare(a.appliedDate);
        }
        if (sortBy === 'date-asc') {
          return a.appliedDate.localeCompare(b.appliedDate);
        }
        if (sortBy === 'company-asc') {
          return a.company.localeCompare(b.company);
        }
        if (sortBy === 'company-desc') {
          return b.company.localeCompare(a.company);
        }
        return 0;
      });
  }, [applications, statusFilter, searchQuery, sortBy]);

  // Click handler for metric cards to filter easily
  const handleSelectMetricFilter = (status: StatusFilter) => {
    if (statusFilter === status && status !== 'All') {
      setStatusFilter('All');
    } else {
      setStatusFilter(status);
    }
  };

  return (
    <div className="app-container">
      <Header
        onOpenAddModal={handleOpenAdd}
        onLoadSampleData={handleLoadSampleData}
        onClearAll={handleRequestClearAll}
        totalCount={applications.length}
      />

      <main className="main-content" id="main-content">
        {/* Dashboard Overview Cards */}
        <DashboardMetrics
          applications={applications}
          activeFilter={statusFilter}
          onSelectFilter={handleSelectMetricFilter}
        />

        {/* Filter and Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filteredCount={filteredAndSortedApplications.length}
          totalCount={applications.length}
          onClearFilters={() => {
            setSearchQuery('');
            setStatusFilter('All');
          }}
        />

        {/* Applications List Grid or Empty State */}
        <ApplicationList
          applications={filteredAndSortedApplications}
          totalApplicationsCount={applications.length}
          onEdit={handleOpenEdit}
          onDelete={handleRequestDelete}
          onOpenAddModal={handleOpenAdd}
          onLoadSampleData={handleLoadSampleData}
          onClearFilters={() => {
            setSearchQuery('');
            setStatusFilter('All');
          }}
        />
      </main>

      {/* Add / Edit Modal */}
      <ApplicationModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingApplication(null);
        }}
        onSubmit={editingApplication ? handleUpdateApplication : handleCreateApplication}
        editingApplication={editingApplication}
      />

      {/* Deletion / Reset Confirmation Dialog */}
      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Toast Feedback */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <p className="footer-text">
            <strong>ApplyTrack</strong> &bull; Portfolio Project &bull; Built with React, TypeScript &amp; Vite
          </p>
          <p className="footer-subtext">
            All data is saved privately in your browser&apos;s local storage.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
