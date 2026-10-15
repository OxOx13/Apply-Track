export type ApplicationStatus = 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface Application {
  id: string;
  company: string;
  role: string;
  jobUrl: string;
  appliedDate: string; // YYYY-MM-DD
  status: ApplicationStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationFormData = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;

export type StatusFilter = 'All' | ApplicationStatus;

export type SortOption = 'date-desc' | 'date-asc' | 'company-asc' | 'company-desc';

export interface FilterState {
  searchQuery: string;
  status: StatusFilter;
  sortBy: SortOption;
}

export interface StatusCount {
  status: ApplicationStatus;
  count: number;
  label: string;
  color: string;
  bgLight: string;
  borderColor: string;
}
