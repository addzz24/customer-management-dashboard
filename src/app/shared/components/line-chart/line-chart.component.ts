import { Component, ElementRef, Input, effect, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  @Input() data: { date: string; amount: number }[] = [];

  constructor() {
    effect(() => {
      this.renderChart();
    });
  }

  renderChart() {
    const element = this.chartContainer.nativeElement;
    element.innerHTML = '';

    const width = element.clientWidth;
    const height = 260;

    const svg = d3.select(element).append('svg').attr('width', width).attr('height', height);

    const x = d3
      .scalePoint()
      .domain(this.data.map((d) => d.date))
      .range([40, width - 20]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.amount)!])
      .nice()
      .range([height - 20, 20]);

    const line = d3
      .line<any>()
      .x((d) => x(d.date)!)
      .y((d) => y(d.amount));

    svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', '#6366f1')
      .attr('stroke-width', 2)
      .attr('d', line as any);
  }
}
