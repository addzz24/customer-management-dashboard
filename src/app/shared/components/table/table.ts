import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { Customer } from '../../../core/models/customer.model';
import { DashboardStore } from '../../../store/dashboard/dashboard.store';
import { effect, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
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
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  displayedColumns = ['name', 'email', 'mobile', 'category', 'amount', 'date', 'status', 'actions'];
  filters = {
    search: '',
    status: '',
    category: '',
    startDate: '',
    endDate: '',
  };

  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  store = inject(DashboardStore);

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.customers();
    });

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const f = JSON.parse(filter);
      const searchMatch =
        data.name.toLowerCase().includes(f.search) || data.email.toLowerCase().includes(f.search);
      const statusMatch = !f.status || data.status === f.status;
      const categoryMatch = !f.category || data.category === f.category;
      const dateMatch =
        (!f.startDate || new Date(data.date) >= new Date(f.startDate)) &&
        (!f.endDate || new Date(data.date) <= new Date(f.endDate));

      return searchMatch && statusMatch && categoryMatch && dateMatch;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filters.search = value.trim().toLowerCase();

    this.applyFilters();
  }

  applyFilters() {
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  deleteCustomer(id: string) {
    this.store.deleteCustomer(id);
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
}
