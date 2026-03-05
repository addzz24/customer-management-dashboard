import { Customer } from '../../core/models/model';
import { TableFilterConfig } from '../../core/types/types';

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

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: crypto.randomUUID(),
    name: 'Emma Wilson',
    email: 'emma@test.com',
    mobile: '6666666666',
    category: 'Travel',
    amount: 4500,
    date: '2026-03-05',
    status: 'Pending',
  },
  {
    id: crypto.randomUUID(),
    name: 'Michael Johnson',
    email: 'michael@test.com',
    mobile: '5555555555',
    category: 'Food',
    amount: 1800,
    date: '2026-03-03',
    status: 'Completed',
  },
  {
    id: crypto.randomUUID(),
    name: 'Sophia Martinez',
    email: 'sophia@test.com',
    mobile: '4444444444',
    category: 'Shopping',
    amount: 2700,
    date: '2026-03-06',
    status: 'Pending',
  },
  {
    id: crypto.randomUUID(),
    name: 'Daniel Anderson',
    email: 'daniel@test.com',
    mobile: '3333333333',
    category: 'Travel',
    amount: 5200,
    date: '2026-03-07',
    status: 'Completed',
  },
  {
    id: crypto.randomUUID(),
    name: 'Olivia Thomas',
    email: 'olivia@test.com',
    mobile: '2222222222',
    category: 'Food',
    amount: 1500,
    date: '2026-03-08',
    status: 'Pending',
  },
];
