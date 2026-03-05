import { Customer } from '../../core/models/customer.model';

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

    const initialCustomers: Customer[] = [
      {
        id: crypto.randomUUID(),
        name: 'John Doe',
        email: 'john@test.com',
        mobile: '9999999999',
        category: 'Travel',
        amount: 5000,
        date: '2026-03-04',
        status: 'Completed',
      },
      {
        id: crypto.randomUUID(),
        name: 'Alice Smith',
        email: 'alice@test.com',
        mobile: '8888888888',
        category: 'Food',
        amount: 2000,
        date: '2026-03-02',
        status: 'Pending',
      },
      {
        id: crypto.randomUUID(),
        name: 'Robert Brown',
        email: 'robert@test.com',
        mobile: '7777777777',
        category: 'Shopping',
        amount: 3200,
        date: '2026-03-01',
        status: 'Completed',
      },
    ];

    store.customers.set(initialCustomers);
    localStorage.setItem('customers', JSON.stringify(initialCustomers));
  },
});
