import { Component, Input, ViewChild, AfterViewInit, effect, inject, OnInit } from '@angular/core';

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

  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() tableColumns: any[] = [];
  @Input() filtersConfig: any[] = [];
  @Input() enablePagination = true;
  @Input() enableSorting = true;

  dataSource = new MatTableDataSource<any>();
  filters: TableFilters = {};

  store = inject(DashboardStore);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;




  ngOnInit() {
    this.dataSource.data = this.data;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const f = JSON.parse(filter);

      const searchMatch =
        data.name.toLowerCase().includes(f.search || '') ||
        data.email.toLowerCase().includes(f.search || '');

      const statusMatch = !f.status || data.status === f.status;

      const categoryMatch = !f.category || data.category === f.category;

      const dateMatch =
        (!f.startDate || new Date(data.date) >= new Date(f.startDate)) &&
        (!f.endDate || new Date(data.date) <= new Date(f.endDate));

      return searchMatch && statusMatch && categoryMatch && dateMatch;
    };
  }

  ngAfterViewInit() {
    if (this.enablePagination) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.enableSorting) {
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
}
