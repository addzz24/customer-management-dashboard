import { Component, effect, inject, OnInit } from '@angular/core';
import { KeyPerformanceIndicator } from '../key-performance-indicator/key-performance-indicator';
import { DashboardStore } from '../../store/dashboard/dashboard.store';
import { DataTableComponent } from "../../shared/components/data-table/data-table.component";
import { Customer } from '../../core/models/model';

@Component({
  selector: 'app-dashboard',
  imports: [KeyPerformanceIndicator, DataTableComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})export class Dashboard implements OnInit {

  store = inject(DashboardStore);

  customers: Customer[] =  [];

  constructor() {
    effect(() => {
      this.customers = this.store.customers();
    });
  }

  displayedColumns = [
  'name',
  'email',
  'mobile',
  'category',
  'amount',
  'date',
  'status',
  'actions'
  ];

  filtersConfig = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Completed', 'Pending']
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      options: ['Travel', 'Food', 'Shopping']
    },
    {
      key: 'startDate',
      label: 'Start Date',
      type: 'date'
    },
    {
      key: 'endDate',
      label: 'End Date',
      type: 'date'
    }
  ];


  ngOnInit() {
    this.store.loadCustomers();
  }
}
