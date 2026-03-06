import { Customer } from '../../core/models/model';

export interface Filters {
  search: string;
  status: string | null;
  category: string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface GlobalState {
  customers: Customer[];
  filters: Filters;
}

export const initialGlobalState: GlobalState = {
  customers: [],
  filters: {
    search: '',
    status: null,
    category: null,
    startDate: null,
    endDate: null,
  },
};
