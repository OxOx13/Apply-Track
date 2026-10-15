import React, { useState, useEffect, useRef } from 'react';
import type {
  Application,
  ApplicationFormData,
  ApplicationStatus,
} from '../types/application';
import { X, Check, Building2, Briefcase, Link2, Calendar, FileText, Bookmark } from 'lucide-react';
import './ApplicationModal.css';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ApplicationFormData) => void;
  editingApplication: Application | null;
}

const STATUS_LIST: ApplicationStatus[] = [
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingApplication,
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    company: '',
    role: '',
    jobUrl: '',
    appliedDate: getTodayDateString(),
    status: 'Applied',
    notes: '',
  });

  const [errors, setErrors] = useState<{
    company?: string;
    role?: string;
    jobUrl?: string;
  }>({});

  const companyInputRef = useRef<HTMLInputElement>(null);

  // Sync state when editingApplication changes or modal opens
  useEffect(() => {
    if (editingApplication) {
      setFormData({
        company: editingApplication.company,
        role: editingApplication.role,
        jobUrl: editingApplication.jobUrl,
        appliedDate: editingApplication.appliedDate || getTodayDateString(),
        status: editingApplication.status,
        notes: editingApplication.notes || '',
      });
    } else {
      setFormData({
        company: '',
        role: '',
        jobUrl: '',
        appliedDate: getTodayDateString(),
        status: 'Applied',
        notes: '',
      });
    }
    setErrors({});
  }, [editingApplication, isOpen]);

  // Autofocus first input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        companyInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: { company?: string; role?: string; jobUrl?: string } = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role or internship title is required';
    }

    if (formData.jobUrl.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
      if (!urlPattern.test(formData.jobUrl.trim())) {
        newErrors.jobUrl = 'Please enter a valid website address (e.g. https://company.com/job)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      company: formData.company.trim(),
      role: formData.role.trim(),
      jobUrl: formData.jobUrl.trim(),
      appliedDate: formData.appliedDate,
      status: formData.status,
      notes: formData.notes.trim(),
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isEditing = Boolean(editingApplication);

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="modal-title" className="modal-title">
              {isEditing ? 'Edit Application' : 'Add New Application'}
            </h2>
            <p className="modal-subtitle">
              {isEditing
                ? 'Update company details, interview stage, or preparation notes'
                : 'Track a new opportunity for your internship or job search'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-grid">
            {/* Company Name */}
            <div className="form-field">
              <label htmlFor="field-company" className="field-label">
                <Building2 size={15} aria-hidden="true" />
                <span>Company Name *</span>
              </label>
              <input
                ref={companyInputRef}
                id="field-company"
                type="text"
                className={`field-input ${errors.company ? 'has-error' : ''}`}
                placeholder="e.g. Stripe, Google, Linear"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                aria-required="true"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? 'company-error' : undefined}
              />
              {errors.company && (
                <span id="company-error" className="field-error-message" role="alert">
                  {errors.company}
                </span>
              )}
            </div>

            {/* Role Title */}
            <div className="form-field">
              <label htmlFor="field-role" className="field-label">
                <Briefcase size={15} aria-hidden="true" />
                <span>Role / Position *</span>
              </label>
              <input
                id="field-role"
                type="text"
                className={`field-input ${errors.role ? 'has-error' : ''}`}
                placeholder="e.g. Software Engineer Intern"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                aria-required="true"
                aria-invalid={Boolean(errors.role)}
                aria-describedby={errors.role ? 'role-error' : undefined}
              />
              {errors.role && (
                <span id="role-error" className="field-error-message" role="alert">
                  {errors.role}
                </span>
              )}
            </div>

            {/* Status Select */}
            <div className="form-field">
              <label htmlFor="field-status" className="field-label">
                <Bookmark size={15} aria-hidden="true" />
                <span>Application Status *</span>
              </label>
              <select
                id="field-status"
                className="field-select"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as ApplicationStatus,
                  })
                }
              >
                {STATUS_LIST.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Application Date */}
            <div className="form-field">
              <label htmlFor="field-date" className="field-label">
                <Calendar size={15} aria-hidden="true" />
                <span>Application Date *</span>
              </label>
              <input
                id="field-date"
                type="date"
                className="field-input"
                value={formData.appliedDate}
                onChange={(e) =>
                  setFormData({ ...formData, appliedDate: e.target.value })
                }
                required
              />
            </div>

            {/* Job URL */}
            <div className="form-field form-field-full">
              <label htmlFor="field-job-url" className="field-label">
                <Link2 size={15} aria-hidden="true" />
                <span>Job Posting URL (Optional)</span>
              </label>
              <input
                id="field-job-url"
                type="url"
                className={`field-input ${errors.jobUrl ? 'has-error' : ''}`}
                placeholder="https://careers.company.com/job/12345"
                value={formData.jobUrl}
                onChange={(e) =>
                  setFormData({ ...formData, jobUrl: e.target.value })
                }
                aria-invalid={Boolean(errors.jobUrl)}
                aria-describedby={errors.jobUrl ? 'job-url-error' : undefined}
              />
              {errors.jobUrl && (
                <span id="job-url-error" className="field-error-message" role="alert">
                  {errors.jobUrl}
                </span>
              )}
            </div>

            {/* Notes */}
            <div className="form-field form-field-full">
              <label htmlFor="field-notes" className="field-label">
                <FileText size={15} aria-hidden="true" />
                <span>Notes & Follow-ups (Optional)</span>
              </label>
              <textarea
                id="field-notes"
                className="field-textarea"
                rows={4}
                placeholder="Recruiter contact, interview rounds, salary range, questions to prepare, or timeline details..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={18} />
              <span>{isEditing ? 'Save Changes' : 'Add Application'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
