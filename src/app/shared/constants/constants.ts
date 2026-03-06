import { Customer } from '../../core/models/model';
import { TableFilterConfig } from '../../core/types/types';

export const FORM_VALIDATION_MESSAGES = {
  REQUIRED: {
    name: 'Name is required',
    email: 'Email is required',
    mobile: 'Mobile number is required',
    category: 'Please select category',
    amount: 'Amount is required',
    date: 'Please select date',
    status: 'Please select status',
  },

  EMAIL_INVALID: 'Please enter a valid email address',

  MIN_LENGTH: {
    name: 'Name must be at least 3 characters',
    mobile: 'Please enter a valid mobile number',
  },
};

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
