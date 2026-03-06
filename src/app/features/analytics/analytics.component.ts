import { Component, inject, output, signal } from '@angular/core';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { BarChartComponent } from '../../shared/components/bar-chart/bar-chart.component';
import { GlobalStore } from '../../store/global/global.store';

@Component({
  selector: 'app-analytics',
  imports: [PieChartComponent, LineChartComponent, BarChartComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {

  /**
   * DESCRIPTION :
   * - Component holds the charts and their interaction logic the tabel
   * - Using store computed signals for analytics
   */

  private store = inject(GlobalStore);
  chartFilter = signal<any>(null);

  currentFilter = output<any>();

  public spendByCategory = () => this.store.spendByCategory();
  public spendByStatus = () => this.store.spendByStatus();
  public spendTrendByDate = () => this.store.spendTrendByDate();

  onStatusFilter(status: string) {
    this.currentFilter.emit({status})
  }

  onCategoryFilter(category: string) {
    this.currentFilter.emit({category})
  }

  onDateFilter(startDate: string) {
    this.currentFilter.emit({startDate})
  }
}
