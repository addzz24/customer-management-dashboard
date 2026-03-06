import { Component, effect, inject } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { GlobalStore } from '../../store/global/global.store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-key-performance-indicator',
  imports: [CardComponent, CommonModule, MatIconModule],
  templateUrl: './key-performance-indicator.component.html',
  styleUrl: './key-performance-indicator.component.css',
  standalone: true,
})
export class KeyPerformanceIndicatorComponent {
  /**
   * DESCRIPTION :
   * - Component displays key performance indicators.
   * - Using store computed signals for showing the indicators
   */
  store = inject(GlobalStore);

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
        name: 'Customers',
        value: totalCustomers,
        icon: 'people',
        trend: ((completed - pending) / totalOrders) * 100,
      },
      {
        name: 'Spend',
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
