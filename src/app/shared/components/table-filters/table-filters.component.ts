import { Component, Input, Output, EventEmitter, output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TableFilterConfig } from '../../../core/types/types';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule
],
  templateUrl: './table-filters.component.html'
})
export class TableFiltersComponent {

  /**
   * DESCRIPTION:
   * This component is a reusable filter component that can be used across the application.
   * It takes in the following input:
   * - filtersConfig: An array of filter configurations for the table.
   * The component emits the applied filters through the apply output and emits a reset event through the reset output when the filters are reset.
   */

  filters: any = {};

  filtersConfig = input<TableFilterConfig[]>([]);

  apply = output();
  reset = output();


  applyFilters() {
    this.apply.emit(this.filters);
  }

  resetFilters() {
    this.filters = {};
    this.reset.emit();
  }
}
