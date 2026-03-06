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

  const margin = { top: 20, right: 20, bottom: 40, left: 50 };

  const width = element.clientWidth - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .style('width', '100%')
    .style('height', '100%')
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const tooltip = d3
    .select(element)
    .append('div')
    .style('position', 'absolute')
    .style('background', '#111827')
    .style('color', 'white')
    .style('padding', '6px 10px')
    .style('border-radius', '6px')
    .style('font-size', '12px')
    .style('pointer-events', 'none')
    .style('opacity', 0);

  const x = d3
    .scaleBand()
    .domain(this.data.map((d) => d.category))
    .range([0, width])
    .padding(0.4);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(this.data, (d) => d.amount)!])
    .nice()
    .range([height, 0]);

  svg
    .selectAll('rect')
    .data(this.data)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.category)!)
    .attr('y', (d) => y(d.amount))
    .attr('width', x.bandwidth())
    .attr('height', (d) => height - y(d.amount))
    .attr('fill', '#3b82f6')
    .attr('rx', 6)

    .on('mouseover', (event: any, d: any) => {
      tooltip
        .style('opacity', 1)
        .html(`${d.category}: ₹${d.amount}`);

      d3.select(event.currentTarget).attr('fill', '#2563eb');
    })

    .on('mousemove', (event: any) => {
      tooltip.style('left', event.pageX + 10 + 'px').style('top', event.pageY - 50 + 'px');
    })

    .on('mouseleave', (event: any) => {
      tooltip.style('opacity', 0);
      d3.select(event.currentTarget).attr('fill', '#3b82f6');
    });

  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg
    .append('g')
    .call(d3.axisLeft(y).ticks(5));
}
}
