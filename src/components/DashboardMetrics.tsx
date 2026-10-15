import React from 'react';
import type { Application, ApplicationStatus, StatusFilter } from '../types/application';
import {
  Briefcase,
  Bookmark,
  SendHorizontal,
  CalendarCheck2,
  Sparkles,
  XCircle,
} from 'lucide-react';
import './DashboardMetrics.css';

interface DashboardMetricsProps {
  applications: Application[];
  activeFilter: StatusFilter;
  onSelectFilter: (status: StatusFilter) => void;
}

interface MetricItem {
  id: StatusFilter;
  label: string;
  count: number;
  icon: React.ReactNode;
  colorVar: string;
  bgVar: string;
  borderVar: string;
  dotVar?: string;
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  applications,
  activeFilter,
  onSelectFilter,
}) => {
  const counts: Record<ApplicationStatus, number> = {
    Saved: 0,
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  };

  applications.forEach((app) => {
    if (counts[app.status] !== undefined) {
      counts[app.status]++;
    }
  });

  const total = applications.length;

  const metricCards: MetricItem[] = [
    {
      id: 'All',
      label: 'Total Applications',
      count: total,
      icon: <Briefcase size={20} />,
      colorVar: 'var(--navy-900)',
      bgVar: 'var(--bg-surface)',
      borderVar: 'var(--border-light)',
    },
    {
      id: 'Saved',
      label: 'Saved',
      count: counts.Saved,
      icon: <Bookmark size={20} />,
      colorVar: 'var(--status-saved-text)',
      bgVar: 'var(--status-saved-bg)',
      borderVar: 'var(--status-saved-border)',
      dotVar: 'var(--status-saved-dot)',
    },
    {
      id: 'Applied',
      label: 'Applied',
      count: counts.Applied,
      icon: <SendHorizontal size={20} />,
      colorVar: 'var(--status-applied-text)',
      bgVar: 'var(--status-applied-bg)',
      borderVar: 'var(--status-applied-border)',
      dotVar: 'var(--status-applied-dot)',
    },
    {
      id: 'Interview',
      label: 'Interviewing',
      count: counts.Interview,
      icon: <CalendarCheck2 size={20} />,
      colorVar: 'var(--status-interview-text)',
      bgVar: 'var(--status-interview-bg)',
      borderVar: 'var(--status-interview-border)',
      dotVar: 'var(--status-interview-dot)',
    },
    {
      id: 'Offer',
      label: 'Offers',
      count: counts.Offer,
      icon: <Sparkles size={20} />,
      colorVar: 'var(--status-offer-text)',
      bgVar: 'var(--status-offer-bg)',
      borderVar: 'var(--status-offer-border)',
      dotVar: 'var(--status-offer-dot)',
    },
    {
      id: 'Rejected',
      label: 'Rejected',
      count: counts.Rejected,
      icon: <XCircle size={20} />,
      colorVar: 'var(--status-rejected-text)',
      bgVar: 'var(--status-rejected-bg)',
      borderVar: 'var(--status-rejected-border)',
      dotVar: 'var(--status-rejected-dot)',
    },
  ];

  return (
    <section className="dashboard-metrics-section" aria-label="Application statistics">
      <div className="metrics-header-row">
        <div>
          <h2 className="section-title">Overview Pipeline</h2>
          <p className="section-subtitle">
            Click any metric card below to filter your list
          </p>
        </div>
        {activeFilter !== 'All' && (
          <button
            type="button"
            className="clear-filter-badge"
            onClick={() => onSelectFilter('All')}
            aria-label="Clear active filter"
          >
            Filtered by: <strong>{activeFilter}</strong> &times;
          </button>
        )}
      </div>

      <div className="metrics-grid">
        {metricCards.map((card) => {
          const isActive = activeFilter === card.id;

          return (
            <button
              key={card.id}
              type="button"
              className={`metric-card ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectFilter(card.id)}
              aria-pressed={isActive}
              aria-label={`Filter by ${card.label}: ${card.count} application${card.count === 1 ? '' : 's'}`}
            >
              <div className="metric-card-top">
                <span
                  className="metric-icon-badge"
                  style={{
                    color: card.colorVar,
                    backgroundColor: card.bgVar,
                    borderColor: card.borderVar,
                  }}
                >
                  {card.icon}
                </span>
                {card.dotVar && (
                  <span
                    className="metric-dot"
                    style={{ backgroundColor: card.dotVar }}
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="metric-body">
                <span className="metric-number">{card.count}</span>
                <span className="metric-label">{card.label}</span>
              </div>

              <div className="metric-footer-hint">
                {isActive ? 'Active filter' : 'Click to filter'}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
