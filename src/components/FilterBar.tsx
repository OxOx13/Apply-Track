import React from 'react';
import { Search, X, ArrowUpDown, Filter } from 'lucide-react';
import type { StatusFilter, SortOption } from '../types/application';
import './FilterBar.css';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filteredCount: number;
  totalCount: number;
  onClearFilters: () => void;
}

const STATUS_OPTIONS: { id: StatusFilter; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'Saved', label: 'Saved' },
  { id: 'Applied', label: 'Applied' },
  { id: 'Interview', label: 'Interview' },
  { id: 'Offer', label: 'Offer' },
  { id: 'Rejected', label: 'Rejected' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  filteredCount,
  totalCount,
  onClearFilters,
}) => {
  const isFiltered = searchQuery.trim() !== '' || statusFilter !== 'All';

  return (
    <section className="filter-bar-card" aria-label="Search and filter applications">
      <div className="filter-bar-top-row">
        {/* Search input with accessible label */}
        <div className="search-box-wrapper">
          <label htmlFor="application-search-input" className="sr-only">
            Search applications by company or role
          </label>
          <div className="search-input-container">
            <Search className="search-icon" size={18} aria-hidden="true" />
            <input
              id="application-search-input"
              type="text"
              className="search-input"
              placeholder="Search by company or role..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search text"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Sort selector */}
        <div className="sort-box-wrapper">
          <label htmlFor="sort-select" className="sort-label">
            <ArrowUpDown size={15} aria-hidden="true" />
            <span>Sort by:</span>
          </label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            <option value="date-desc">Application Date (Newest first)</option>
            <option value="date-asc">Application Date (Oldest first)</option>
            <option value="company-asc">Company Name (A to Z)</option>
            <option value="company-desc">Company Name (Z to A)</option>
          </select>
        </div>
      </div>

      <div className="filter-bar-bottom-row">
        {/* Status Pills */}
        <div className="status-pills-group" role="group" aria-label="Filter by application status">
          <span className="pills-label">
            <Filter size={14} aria-hidden="true" />
            <span>Status:</span>
          </span>
          <div className="pills-list">
            {STATUS_OPTIONS.map((opt) => {
              const isSelected = statusFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`status-pill ${isSelected ? 'is-selected' : ''} pill-${opt.id.toLowerCase()}`}
                  onClick={() => onStatusChange(opt.id)}
                  aria-pressed={isSelected}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results summary & Reset */}
        <div className="results-counter">
          <span>
            Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> applications
          </span>
          {isFiltered && (
            <button
              type="button"
              className="reset-filters-link"
              onClick={onClearFilters}
              aria-label="Reset all search and status filters"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
