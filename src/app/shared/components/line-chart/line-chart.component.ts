import { Component, ElementRef, Input, effect, ViewChild, input, output } from '@angular/core';
import * as d3 from 'd3';
import { LineChartData } from '../../../core/types/types';

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  data = input<LineChartData[]>();
  dateClick = output<string>();
  selectedDate: string | null = null;

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

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
      )
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const data = this.data() ?? [];

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.date))
      .range([40, width - 20]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.amount)!])
      .nice()
      .range([height - 20, 20]);

    const line = d3
      .line<any>()
      .x((d) => x(d.date)!)
      .y((d) => y(d.amount));

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', '#111')
      .style('color', '#fff')
      .style('padding', '6px 10px')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    const hoverLine = svg
      .append('line')
      .attr('stroke', '#9ca3af')
      .attr('stroke-width', 1)
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .style('opacity', 0);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#6366f1')
      .attr('stroke-width', 2)
      .attr('d', line as any);

    // X Axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '11px');

    // Y Axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .style('font-size', '11px');

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.date)!)
      .attr('cy', (d) => y(d.amount))
      .attr('r', (d) => (d.date === this.selectedDate ? 7 : 5))
      .style('cursor', 'pointer')

      .attr('fill', (d) => (d.date === this.selectedDate ? '#22c55e' : '#6366f1'))
      .on('click', (event: any, d: any) => {
        this.selectedDate = d.date;
        this.dateClick.emit(d.date);
        svg
          .selectAll('circle')
          .attr('fill', (c: any) => (c.date === this.selectedDate ? '#22c55e' : '#6366f1'))
          .attr('r', (c: any) => (c.date === this.selectedDate ? 7 : 5));
      })
      .on('mouseenter', (event: any, d: any) => {
        hoverLine.attr('x1', x(d.date)!).attr('x2', x(d.date)!).style('opacity', 1);

        tooltip.style('opacity', 1).html(`
        <div>
          <b>${d.date}</b><br/>
          ₹ ${d.amount}
        </div>
      `);
      })

      .on('mousemove', (event: any) => {
        tooltip.style('left', event.pageX + 10 + 'px').style('top', event.pageY - 50 + 'px');

        d3.select(event.currentTarget).transition().duration(100).attr('r', 5);
      })

      .on('mouseleave', () => {
        hoverLine.style('opacity', 0);
        tooltip.style('opacity', 0);
      });
  }
}
