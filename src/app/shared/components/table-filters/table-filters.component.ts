import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TableFilterConfig } from '../../../core/types/types';

@Component({
  selector: 'app-table-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './table-filters.component.html'
})
export class TableFiltersComponent {

  @Input() filtersConfig: TableFilterConfig[] = [];

  @Output() apply = new EventEmitter<any>();
  @Output() reset = new EventEmitter<void>();

  filters: any = {};

  applyFilters() {
    this.apply.emit(this.filters);
  }

  resetFilters() {
    this.filters = {};
    this.reset.emit();
  }

}
