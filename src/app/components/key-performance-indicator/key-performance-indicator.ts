import { Component, inject } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { DashboardStore } from '../../store/dashboard/dashboard.store';
@Component({
  selector: 'app-key-performance-indicator',
  imports: [Card],
  templateUrl: './key-performance-indicator.html',
  styleUrl: './key-performance-indicator.css',
  standalone: true
})
export class KeyPerformanceIndicator {
  store = inject(DashboardStore);

  constructor(){
  }
}
