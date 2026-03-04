import { Customer } from "../../shared/models/customer.model";

export interface Filters {
  search: string;
  status: string | null;
  category: string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface DashboardState {
  customers: Customer[];
  filters: Filters;
}

export const initialDashboardState: DashboardState = {
  customers: [],
  filters: {
    search: '',
    status: null,
    category: null,
    startDate: null,
    endDate: null
  }
};
