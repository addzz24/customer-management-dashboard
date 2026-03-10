import { Customer } from '../../core/models/model';
import { INITIAL_CUSTOMERS } from '../../shared/constants/customers';
import { STORAGE_KEY } from './global.store';

export const globalMethods = (store: any) => ({
  /* ADD CUSTOMER */
  addCustomer(customer: Customer) {
    store.customers.update((list: Customer[]) => {
      const updated = [...list, customer];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  },

  /* DELETE CUSTOMER */
  deleteCustomer(id: string) {
    store.customers.update((list: Customer[]) => {
      const updated = list.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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

  /* LOADING INITIAL DATA FROM STORAGE */
  loadCustomers() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      store.customers.set(JSON.parse(stored));
      return;
    }

    const initialCustomers: Customer[] = INITIAL_CUSTOMERS;

    store.customers.set(initialCustomers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCustomers));
  },
});
