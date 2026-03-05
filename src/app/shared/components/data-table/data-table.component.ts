import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  effect,
  inject,
  OnInit,
  input,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableSearchComponent } from '../table-search/table-search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { TableFiltersComponent } from '../table-filters/table-filters.component';
import { TableFilters } from '../../../core/types/types';
import { DashboardStore } from '../../../store/dashboard/dashboard.store';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    TableSearchComponent,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    TableFiltersComponent,
  ],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements AfterViewInit, OnInit {

  /**
   * DESCRIPTION:
   * This component is a reusable data table that can be used across the application.
   * It supports pagination, sorting, searching, and filtering. The component takes in the following inputs:
   * - columns: An array of column names to be displayed in the table.
   * - data: An array of data objects to be displayed in the table.
   * - tableColumns: An array of column names to be used for sorting and filtering.
   * - filtersConfig: An array of filter configurations for the table.
   * - enablePagination: A boolean to enable or disable pagination.
   * - enableSorting: A boolean to enable or disable sorting.
   * - enableSearch: A boolean to enable or disable searching.
   * - enableFilters: A boolean to enable or disable filters.
   * The component uses Angular Material's MatTable, MatPaginator, and MatSort for the table functionality.
   * It also uses custom components TableSearchComponent and TableFiltersComponent for searching and filtering functionality respectively.
   */

  columns = input<string[]>([]);
  data = input<any[]>([]);
  tableColumns = input<string[]>([]);
  filtersConfig = input<any[]>([]);
  enablePagination = input();
  enableSorting = input();
  enableSearch = input();
  enableFilters = input();

  dataSource = new MatTableDataSource<any>();
  filters: TableFilters = {};

  store = inject(DashboardStore);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.data = this.data();
    this.dataPredicate();
  }

  ngAfterViewInit() {
    if (this.enablePagination()) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.enableSorting()) {
      this.dataSource.sort = this.sort;
    }
  }

  onSearch(value: string) {
    this.filters.search = value.toLowerCase();

    this.applyFilters();
  }

  onApplyFilters(filters: any) {
    this.filters = {
      ...this.filters,
      ...filters,
    };

    this.applyFilters();
  }

  applyFilters() {
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  resetFilters() {
    this.filters = {
      search: '',
      status: '',
      category: '',
      startDate: '',
      endDate: '',
    };

    this.dataSource.filter = JSON.stringify(this.filters);
    this.filters.search = '';
  }

  deleteCustomer(id: string) {
    this.store.deleteCustomer(id);
  }

  dataPredicate() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const f = JSON.parse(filter);
      const searchMatch = Object.values(data)
        .join(' ')
        .toLowerCase()
        .includes((f.search || '').toLowerCase());

      const filterMatch = Object.keys(f).every((key) => {
        if (key === 'search') return true;

        if (!f[key]) return true;

        if (key.toLowerCase().includes('date')) {
          const rowDate = new Date(data.date);
          const filterDate = new Date(f[key]);
          return key === 'startDate' ? rowDate >= filterDate : rowDate <= filterDate;
        }

        return data[key] === f[key];
      });

      return searchMatch && filterMatch;
    };
  }
}
