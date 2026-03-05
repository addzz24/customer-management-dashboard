import { Component, inject, OnInit } from '@angular/core';
import { KeyPerformanceIndicator } from '../key-performance-indicator/key-performance-indicator';
import { DashboardStore } from '../../store/dashboard/dashboard.store';
import { Table } from "../../shared/components/table/table";

@Component({
  selector: 'app-dashboard',
  imports: [KeyPerformanceIndicator, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  store = inject(DashboardStore);

  ngOnInit() {
    this.store.loadCustomers();
    console.log('Dashboard initialized, customers loaded');
  }
}
