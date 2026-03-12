import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartComponent } from './line-chart.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;
  const mockData = [
    { date: '2024-01-01', amount: 100 },
    { date: '2024-01-02', amount: 200 },
    { date: '2024-01-03', amount: 150 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render chart when data changes', () => {
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should create circles for each data item', () => {
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const circles = fixture.nativeElement.querySelectorAll('circle');
    expect(circles.length).toBe(mockData.length);
  });

  it('should emit dateClick when circle is clicked', () => {
    spyOn(component.dateClick, 'emit');
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const circle = fixture.nativeElement.querySelector('circle');
    circle.dispatchEvent(new Event('click'));

    expect(component.dateClick.emit).toHaveBeenCalled();

  });

  it('should handle mouseenter event and show tooltip', () => {
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const circle = fixture.nativeElement.querySelector('circle');
    circle.dispatchEvent(new Event('mouseenter'));
    const tooltip = document.body.querySelector('div');

    expect(tooltip).toBeTruthy();
  });

  it('should handle mousemove event', () => {
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const circle = fixture.nativeElement.querySelector('circle');

    circle.dispatchEvent(new MouseEvent('mousemove', {
      clientX: 120,
      clientY: 100
    }));

    expect(circle).toBeTruthy();
  });

  it('should handle mouseleave event', () => {
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const circle = fixture.nativeElement.querySelector('circle');
    circle.dispatchEvent(new Event('mouseleave'));

    expect(circle).toBeTruthy();
  });

  it('should handle empty data safely', () => {
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();

    expect(() => component.renderChart()).not.toThrow();
  });
});
