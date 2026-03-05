import { Customer } from '../../core/models/model';
import { INITIAL_CUSTOMERS } from '../../shared/constants/constants';

export const dashboardMethods = (store: any) => ({
  /* ADD CUSTOMER */
  addCustomer(customer: Customer) {
    store.customers.update((list: Customer[]) => {
      const updated = [...list, customer];
      localStorage.setItem('customers', JSON.stringify(updated));
      return updated;
    });
  },

  /* DELETE CUSTOMER */
  deleteCustomer(id: string) {
    store.customers.update((list: Customer[]) => {
      const updated = list.filter((c) => c.id !== id);
      localStorage.setItem('customers', JSON.stringify(updated));
      return updated;
    });
  },

  /* UPDATE FILTERS */
  updateFilters(filters: any) {
    store.filters.update((current: any) => ({
      ...current,
      ...filters,
    }));
  },

  /* RESET FILTERS */
  resetFilters() {
    store.filters.set({
      search: '',
      status: null,
      category: null,
      startDate: null,
      endDate: null,
    });
  },

  /* LOAD DATA FROM STORAGE */
  loadCustomers() {
    const stored = localStorage.getItem('customers');

    if (stored) {
      store.customers.set(JSON.parse(stored));
      return;
    }

    const initialCustomers: Customer[] = INITIAL_CUSTOMERS;

    store.customers.set(initialCustomers);
    localStorage.setItem('customers', JSON.stringify(initialCustomers));
  },
});
