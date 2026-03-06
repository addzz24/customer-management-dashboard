import { computed } from '@angular/core';

export const globalComputed = (state: any) => ({
  /**
   * Kpi Values
   */
  totalCustomers: computed(() => state.customers().length),

  totalSpend: computed(() => state.customers().reduce((sum: number, c: any) => sum + c.amount, 0)),

  completedOrders: computed(
    () => state.customers().filter((c: any) => c.status === 'Completed').length,
  ),

  pendingOrders: computed(
    () => state.customers().filter((c: any) => c.status === 'Pending').length,
  ),

  /**
   * Table Filtering
   */
  filteredCustomers: computed(() => {
    let data = state.customers();

    const filters = state.filters();

    if (filters.search) {
      const search = filters.search.toLowerCase();

      data = data.filter(
        (c: any) => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search),
      );
    }

    if (filters.status) {
      data = data.filter((c: any) => c.status === filters.status);
    }

    if (filters.category) {
      data = data.filter((c: any) => c.category === filters.category);
    }

    if (filters.startDate) {
      data = data.filter((c: any) => new Date(c.date) >= new Date(filters.startDate!));
    }

    if (filters.endDate) {
      data = data.filter((c: any) => new Date(c.date) <= new Date(filters.endDate!));
    }

    return data;
  }),

  /**
   * BAR CHART : Spend by Category
   */
  spendByCategory: computed(() => {
    const map = new Map<string, number>();

    state.customers().forEach((c: any) => {
      map.set(c.category, (map.get(c.category) || 0) + c.amount);
    });

    return Array.from(map, ([category, amount]) => ({
      category,
      amount,
    }));
  }),

  /**
   * PIE CHART : Spend by Status
   */
  spendByStatus: computed(() => {
    const map = new Map<string, number>();

    state.customers().forEach((c: any) => {
      map.set(c.status, (map.get(c.status) || 0) + c.amount);
    });

    return Array.from(map, ([status, amount]) => ({
      status,
      amount,
    }));
  }),

  /**
   *  LINE CHART :  Spend Trend
   */
  spendTrendByDate: computed(() => {
    const map = new Map<string, number>();

    state.customers().forEach((c: any) => {
      map.set(c.date, (map.get(c.date) || 0) + c.amount);
    });

    return Array.from(map, ([date, amount]) => ({
      date,
      amount,
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }),
});
