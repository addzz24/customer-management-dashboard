import { Component, effect, inject } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { DashboardStore } from '../../store/dashboard/dashboard.store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-key-performance-indicator',
  imports: [Card, CommonModule, MatIconModule],
  templateUrl: './key-performance-indicator.html',
  styleUrl: './key-performance-indicator.css',
  standalone: true,
})
export class KeyPerformanceIndicator {
  store = inject(DashboardStore);

  performanceIndicators: any;

  constructor() {
    effect(() => {
      this.updatePerformanceIndicators();
    });
  }

  updatePerformanceIndicators() {
    const totalCustomers = this.store.totalCustomers();
    const totalSpend = this.store.totalSpend();
    const completed = this.store.completedOrders();
    const pending = this.store.pendingOrders();

    const totalOrders = completed + pending;

    const orderTrend = totalOrders ? (completed / totalOrders) * 100 : 0;

    this.performanceIndicators = [
      {
        name: 'Total Customers',
        value: totalCustomers,
        icon: 'people',
        trend: ((completed - pending) / totalOrders) * 100,
      },
      {
        name: 'Total Spend',
        value: `${totalSpend} ₹`,
        icon: 'monetization_on',
        trend: (totalSpend / 10000) * 5,
      },
      {
        name: 'Completed Orders',
        value: completed,
        icon: 'check_circle',
        trend: orderTrend,
      },
      {
        name: 'Pending Orders',
        value: pending,
        icon: 'pending',
        trend: -(pending / totalOrders) * 100,
      },
    ];
  }
}
