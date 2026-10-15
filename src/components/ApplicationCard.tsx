import React from 'react';
import type { Application, ApplicationStatus } from '../types/application';
import {
  Building2,
  Calendar,
  ExternalLink,
  Edit3,
  Trash2,
  Bookmark,
  SendHorizontal,
  CalendarCheck2,
  Sparkles,
  XCircle,
  FileText,
} from 'lucide-react';
import './ApplicationCard.css';

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
}

const getStatusBadgeConfig = (status: ApplicationStatus) => {
  switch (status) {
    case 'Saved':
      return {
        label: 'Saved',
        icon: <Bookmark size={13} />,
        className: 'badge-saved',
      };
    case 'Applied':
      return {
        label: 'Applied',
        icon: <SendHorizontal size={13} />,
        className: 'badge-applied',
      };
    case 'Interview':
      return {
        label: 'Interview',
        icon: <CalendarCheck2 size={13} />,
        className: 'badge-interview',
      };
    case 'Offer':
      return {
        label: 'Offer Received',
        icon: <Sparkles size={13} />,
        className: 'badge-offer',
      };
    case 'Rejected':
      return {
        label: 'Rejected',
        icon: <XCircle size={13} />,
        className: 'badge-rejected',
      };
    default:
      return {
        label: status,
        icon: null,
        className: 'badge-default',
      };
  }
};

const formatDate = (dateString: string): string => {
  if (!dateString) return 'Date not specified';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    }
    return dateString;
  } catch {
    return dateString;
  }
};

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onEdit,
  onDelete,
}) => {
  const badgeConfig = getStatusBadgeConfig(application.status);
  const formattedDate = formatDate(application.appliedDate);

  // Normalize URL for link if user forgot https://
  const normalizedUrl = application.jobUrl
    ? application.jobUrl.startsWith('http://') || application.jobUrl.startsWith('https://')
      ? application.jobUrl
      : `https://${application.jobUrl}`
    : '';

  return (
    <article className="app-card animate-fade-in" aria-labelledby={`app-title-${application.id}`}>
      <div className="app-card-header">
        <div className="app-company-info">
          <div className="app-company-icon" aria-hidden="true">
            <Building2 size={20} />
          </div>
          <div>
            <h3 id={`app-title-${application.id}`} className="app-company-name">
              {application.company}
            </h3>
            <p className="app-role-title">{application.role}</p>
          </div>
        </div>

        <div className="app-card-actions">
          <button
            type="button"
            className="action-icon-btn edit-btn"
            onClick={() => onEdit(application)}
            title={`Edit ${application.company} application`}
            aria-label={`Edit application for ${application.role} at ${application.company}`}
          >
            <Edit3 size={16} />
          </button>
          <button
            type="button"
            className="action-icon-btn delete-btn"
            onClick={() => onDelete(application)}
            title={`Delete ${application.company} application`}
            aria-label={`Delete application for ${application.role} at ${application.company}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="app-card-meta">
        <span className={`status-badge ${badgeConfig.className}`}>
          {badgeConfig.icon}
          <span>{badgeConfig.label}</span>
        </span>

        <div className="meta-item date-item">
          <Calendar size={14} aria-hidden="true" />
          <span>{formattedDate}</span>
        </div>

        {normalizedUrl && (
          <a
            href={normalizedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="meta-item job-link"
            title={`Open job posting for ${application.company}`}
            aria-label={`Open job posting for ${application.role} at ${application.company} (opens in new tab)`}
          >
            <ExternalLink size={13} aria-hidden="true" />
            <span>Posting</span>
          </a>
        )}
      </div>

      {application.notes ? (
        <div className="app-card-notes">
          <div className="notes-header">
            <FileText size={13} aria-hidden="true" />
            <span>Notes & Next Steps</span>
          </div>
          <p className="notes-content">{application.notes}</p>
        </div>
      ) : (
        <div className="app-card-notes-empty">
          <span>No notes added yet</span>
        </div>
      )}
    </article>
  );
};
