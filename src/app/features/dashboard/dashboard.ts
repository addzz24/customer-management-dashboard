import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { KeyPerformanceIndicator } from '../key-performance-indicator/key-performance-indicator';
import { DashboardStore } from '../../store/dashboard/dashboard.store';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { Customer } from '../../core/models/model';
import { DISPLAYED_COLUMNS, FILTERS_CONFIG } from '../../shared/constants/constants';
import { TableFilterConfig } from '../../core/types/types';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../shared/components/bar-chart/bar-chart.component';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [KeyPerformanceIndicator, DataTableComponent, PieChartComponent, BarChartComponent, LineChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  filtersConfig: TableFilterConfig[] = FILTERS_CONFIG;

  enablePagination = signal(true);
  enableSorting = signal(true);
  enableSearch = signal(true);
  enableFilters = signal(true);

  public spendByCategory = () => this.store.spendByCategory();
  public spendByStatus = () => this.store.spendByStatus();
  public spendTrendByDate = () => this.store.spendTrendByDate();

  private store = inject(DashboardStore);
  private dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.customers = this.store.customers();
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
}
