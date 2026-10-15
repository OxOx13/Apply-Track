import type { Application } from '../types/application';

const STORAGE_KEY = 'applytrack_applications_v1';
const HAS_INITIALIZED_KEY = 'applytrack_initialized_v1';

export const SAMPLE_APPLICATIONS: Application[] = [
  {
    id: 'sample-1',
    company: 'Stripe',
    role: 'Frontend Engineering Intern',
    jobUrl: 'https://stripe.com/jobs/university-frontend',
    appliedDate: '2026-10-02',
    status: 'Interview',
    notes: 'Recruiter phone screen passed! Round 2 technical interview scheduled with the Dashboard team focusing on React, accessibility, and component design.',
    createdAt: '2026-10-02T14:30:00.000Z',
    updatedAt: '2026-10-06T18:15:00.000Z',
  },
  {
    id: 'sample-2',
    company: 'Google',
    role: 'Software Engineer Intern (Summer 2027)',
    jobUrl: 'https://www.google.com/about/careers/applications/jobs/results',
    appliedDate: '2026-09-28',
    status: 'Applied',
    notes: 'Submitted resume via university portal. Completed online assessment. Awaiting recruiter review for team placement match.',
    createdAt: '2026-09-28T09:12:00.000Z',
    updatedAt: '2026-09-28T09:12:00.000Z',
  },
  {
    id: 'sample-3',
    company: 'Figma',
    role: 'Product Engineering Intern',
    jobUrl: 'https://www.figma.com/careers',
    appliedDate: '2026-09-15',
    status: 'Offer',
    notes: 'Received official offer letter! 12-week summer internship in San Francisco. Comprehensive mentoring, team project on collaborative canvas tools. Decision deadline: Nov 1.',
    createdAt: '2026-09-15T16:45:00.000Z',
    updatedAt: '2026-10-10T20:00:00.000Z',
  },
  {
    id: 'sample-4',
    company: 'Linear',
    role: 'Junior Web Engineer',
    jobUrl: 'https://linear.app/careers',
    appliedDate: '2026-10-12',
    status: 'Saved',
    notes: 'Spotted role posting on Twitter/X. Emphasizes clean UI craft, TypeScript mastery, and keyboard navigation. Refining portfolio demo before submitting.',
    createdAt: '2026-10-12T11:00:00.000Z',
    updatedAt: '2026-10-12T11:00:00.000Z',
  },
  {
    id: 'sample-5',
    company: 'Datadog',
    role: 'Full Stack Engineering Intern',
    jobUrl: 'https://www.datadoghq.com/careers/detail/?gh_jid=542109',
    appliedDate: '2026-10-05',
    status: 'Interview',
    notes: 'Take-home assignment completed and submitted. System design & pair-programming interview scheduled for this Friday.',
    createdAt: '2026-10-05T13:20:00.000Z',
    updatedAt: '2026-10-08T17:40:00.000Z',
  },
  {
    id: 'sample-6',
    company: 'Netflix',
    role: 'UI Platform Engineer Intern',
    jobUrl: 'https://jobs.netflix.com/jobs',
    appliedDate: '2026-09-10',
    status: 'Rejected',
    notes: 'Automated notification received. Extremely competitive applicant pool this season. Encouraged to re-apply for fall rotations.',
    createdAt: '2026-09-10T10:00:00.000Z',
    updatedAt: '2026-09-25T14:10:00.000Z',
  },
];

export const loadApplicationsFromStorage = (): Application[] => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    const hasInitialized = localStorage.getItem(HAS_INITIALIZED_KEY);

    if (rawData) {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }

    // First time visitor: load sample data by default so portfolio demo is instantly alive
    if (!hasInitialized) {
      localStorage.setItem(HAS_INITIALIZED_KEY, 'true');
      saveApplicationsToStorage(SAMPLE_APPLICATIONS);
      return SAMPLE_APPLICATIONS;
    }

    return [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return SAMPLE_APPLICATIONS;
  }
};

export const saveApplicationsToStorage = (applications: Application[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    localStorage.setItem(HAS_INITIALIZED_KEY, 'true');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFreshSampleApplications = (): Application[] => {
  // Return deep copy with freshly generated timestamps if needed
  return JSON.parse(JSON.stringify(SAMPLE_APPLICATIONS));
};

export const resetStorageToSampleData = (): Application[] => {
  const sample = getFreshSampleApplications();
  saveApplicationsToStorage(sample);
  return sample;
};

export const clearAllStorageApplications = (): Application[] => {
  saveApplicationsToStorage([]);
  return [];
};
