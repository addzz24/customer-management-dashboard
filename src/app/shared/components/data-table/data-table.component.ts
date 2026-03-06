import {
  Component,
  ViewChild,
  AfterViewInit,
  effect,
  inject,
  OnInit,
  input,
  signal,
  output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { TableSearchComponent } from '../table-search/table-search.component';

import { TableFiltersComponent } from '../table-filters/table-filters.component';
import { TableFilters } from '../../../core/types/types';
import { GlobalStore } from '../../../store/global/global.store'
import { Customer } from '../../../core/models/model';

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
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    TableSearchComponent,
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
  data = input<Customer[]>([]);
  tableColumns = input<string[]>([]);
  filtersConfig = input<any[]>([]);
  enablePagination = input();
  enableSorting = input();
  enableSearch = input();
  enableFilters = input();
  chartFilter = input();

  addNewCustomerEvent = output();

  dataSource = new MatTableDataSource<Customer>();
  filters: TableFilters = {};

  startIndex = signal(0);
  endIndex = signal(0);

  store = inject(GlobalStore);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });

    effect(() => {
      const filter = this.chartFilter();
      if (!filter) return;
      this.onApplyFilters(filter);
    });
  }

  ngOnInit() {
    this.dataSource.data = this.data();
    this.dataPredicate();
  }

  ngAfterViewInit() {
    if (this.enablePagination()) {
      this.dataSource.paginator = this.paginator;

      this.updatePageInfo();
      this.paginator.page.subscribe(() => {
        this.updatePageInfo();
      });
    }

    if (this.enableSorting()) {
      this.dataSource.sort = this.sort;
    }
  }

  onSearch(value: string) {
    this.store.updateFilters({
      search: value.toLowerCase(),
    });
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
     this.store.updateFilters(this.filters);
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
    this.store.resetFilters();
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

  updatePageInfo() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    const start = pageIndex * pageSize + 1;

    const end = Math.min((pageIndex + 1) * pageSize, this.dataSource.filteredData.length);

    this.startIndex.set(start);
    this.endIndex.set(end);
  }

  openCustomerModal() {
    this.addNewCustomerEvent.emit();
  }
}
