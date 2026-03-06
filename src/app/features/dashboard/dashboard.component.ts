import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {  GlobalStore } from '../../store/global/global.store';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { Customer } from '../../core/models/model';
import { DISPLAYED_COLUMNS, FILTERS_CONFIG } from '../../shared/constants/constants';
import { TableFilterConfig } from '../../core/types/types';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { KeyPerformanceIndicatorComponent } from '../key-performance-indicator/key-performance-indicator.component';
import { AnalyticsComponent } from "../analytics/analytics.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    KeyPerformanceIndicatorComponent,
    DataTableComponent,
    AnalyticsComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  /**
   * DESCRIPTION :
   * - Component rendering aroud kpi, data-table for customers and analystics component
   * - Utilized signals hevily for the local state to share with child components
   * - holds to flags which configures the data tables functionalities like search, sort etc.
   */
  customers: Customer[] = [];
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  filtersConfig: TableFilterConfig[] = FILTERS_CONFIG;

  enablePagination = signal(true);
  enableSorting = signal(true);
  enableSearch = signal(true);
  enableFilters = signal(true);
  chartFilter = signal<any>(null);

  private store = inject(GlobalStore);
  private dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.customers = this.store.filteredCustomers();
    });
  }

  ngOnInit() {
    this.store.loadCustomers();
  }

  openCustomerModal() {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '100%',
      maxWidth: '500px',
      panelClass: 'customer-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.addCustomer(result);
      }
    });
  }

  setChartFilter(filter: any){
      this.chartFilter.set(filter)
  }
}
