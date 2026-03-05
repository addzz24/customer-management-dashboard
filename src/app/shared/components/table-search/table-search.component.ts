import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table-search.component.html',
  styleUrl: './table-search.component.css'
})
export class TableSearchComponent {

  search = '';

  @Output() searchChange = new EventEmitter<string>();

  onSearch() {
    this.searchChange.emit(this.search);
  }
}
