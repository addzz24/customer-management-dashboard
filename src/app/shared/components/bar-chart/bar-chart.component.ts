import { Component, effect, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  @Input() data: { category: string; amount: number }[] = [];

  constructor() {
    effect(() => {
      if (this.data) {
        this.renderChart();
      }
    });
  }

  renderChart() {
    const element = this.chartContainer.nativeElement;
    element.innerHTML = '';

    const width = element.clientWidth
    const height = 300;

    const svg = d3.select(element).append('svg').attr('width', width).attr('height', height);

    const x = d3
      .scaleBand()
      .domain(this.data.map((d) => d.category))
      .range([0, width])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.amount)!])
      .nice()
      .range([height - 20, 0]);

    svg
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.category)!)
      .attr('y', (d) => y(d.amount))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - 20 - y(d.amount))
      .attr('fill', '#3b82f6');
  }
}
