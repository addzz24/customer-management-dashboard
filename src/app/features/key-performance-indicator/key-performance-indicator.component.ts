import { Component, effect, inject } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { GlobalStore } from '../../store/global/global.store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-key-performance-indicator',
  imports: [CardComponent, CommonModule, MatIconModule, MatTooltip],
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
        trend: totalOrders ? ((completed - pending) / totalOrders) * 100 : 0,
        tooltipText: 'Total number of customers currently stored in the system. This helps track customer growth.'
      },
      {
        name: 'Spend',
        value: `${totalSpend} ₹`,
        icon: 'monetization_on',
        trend: (totalSpend / 10000) * 5,
        tooltipText: 'Total spending made by all customers. Useful for understanding revenue and financial performance.'
      },
      {
        name: 'Completed Orders',
        value: completed,
        icon: 'check_circle',
        trend: orderTrend,
        tooltipText: 'Number of successfully completed customer orders. Indicates fulfillment performance.'
      },
      {
        name: 'Pending Orders',
        value: pending,
        icon: 'pending',
        trend: totalOrders ? (pending / totalOrders) * 100 : 0,
        tooltipText: 'Number of successfully completed customer orders. Indicates fulfillment performance.'
      },
    ];
  }
}
