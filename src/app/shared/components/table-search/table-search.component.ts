import { Component, Output, EventEmitter, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table-search.component.html',
  styleUrl: './table-search.component.css'
})
export class TableSearchComponent {

  /**
   * DESCRIPTION:
   * This component is a reusable search input that can be used across the application.
   * It takes in the following input:
   * - search: A string to be displayed as the input placeholder.
   * The component emits the search term whenever it changes through the searchChange output.
   * - The component emits the search term whenever it changes through the searchChange output.
   */
  search = signal('');
  searchChange = output<string>();

  onSearch() {
    this.searchChange.emit(this.search());
  }
}
