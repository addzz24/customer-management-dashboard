import { TableFilterConfig } from "../../core/types/types";

export const DISPLAYED_COLUMNS: string[] = [
  'name',
  'email',
  'mobile',
  'category',
  'amount',
  'date',
  'status',
  'actions',
];

export const FILTERS_CONFIG: TableFilterConfig[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: ['Completed', 'Pending'],
  },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    options: ['Travel', 'Food', 'Shopping'],
  },
  {
    key: 'startDate',
    label: 'Start Date',
    type: 'date',
  },
  {
    key: 'endDate',
    label: 'End Date',
    type: 'date',
  },
];
