import { Component, effect, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-pie-chart',
  imports: [],
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  @Input() data: { status: string; amount: number }[] = [];

  constructor() {
    effect(() => {
      this.renderChart();
    });
  }

  renderChart() {
    const element = this.chartContainer.nativeElement;
    element.innerHTML = '';

    const width = element.clientWidth
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<any>().value((d) => d.amount);

    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);

    const color = d3
      .scaleOrdinal()
      .domain(this.data.map((d) => d.status))
      .range(['#10b981', '#ef4444']);

    svg
      .selectAll('path')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.status) as string);
  }
}
