import { computed } from '@angular/core';

export const globalComputed = (state: any) => {

  const filteredCustomers = computed(() => {
    let data = state.customers();
    const filters = state.filters();

    if (filters.search) {
      const search = filters.search.toLowerCase();

      data = data.filter((c: any) => Object.values(c).join(' ').toLowerCase().includes(search));
    }

    if (filters.status) {
      data = data.filter((c: any) => c.status === filters.status);
    }

    if (filters.category) {
      data = data.filter((c: any) => c.category === filters.category);
    }

    if (filters.startDate) {
      data = data.filter(
        (c: any) => new Date(c.date) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      data = data.filter(
        (c: any) => new Date(c.date) <= new Date(filters.endDate)
      );
    }

    return data;
  });

  return {

    /**
     * KPI VALUES
     */
    totalCustomers: computed(() => state.customers().length),

    totalSpend: computed(() =>
      state.customers().reduce((sum: number, c: any) => sum + c.amount, 0)
    ),

    completedOrders: computed(() =>
      state.customers().filter((c: any) => c.status === 'Completed').length
    ),

    pendingOrders: computed(() =>
      state.customers().filter((c: any) => c.status === 'Pending').length
    ),

    /**
     * TABLE DATA
     */
    filteredCustomers,

    /**
     * BAR CHART : Spend by Category
     */
    spendByCategory: computed(() => {
      const map = new Map<string, number>();

      filteredCustomers().forEach((c: any) => {
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

      filteredCustomers().forEach((c: any) => {
        map.set(c.status, (map.get(c.status) || 0) + c.amount);
      });

      return Array.from(map, ([status, amount]) => ({
        status,
        amount,
      }));
    }),

    /**
     * LINE CHART : Spend Trend
     */
    spendTrendByDate: computed(() => {
      const map = new Map<string, number>();

      filteredCustomers().forEach((c: any) => {
        map.set(c.date, (map.get(c.date) || 0) + c.amount);
      });

      return Array.from(map, ([date, amount]) => ({
        date,
        amount,
      })).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }),
  };
};
