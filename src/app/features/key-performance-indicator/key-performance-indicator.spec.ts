import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPerformanceIndicator } from './key-performance-indicator';

describe('KeyPerformanceIndicator', () => {
  let component: KeyPerformanceIndicator;
  let fixture: ComponentFixture<KeyPerformanceIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyPerformanceIndicator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyPerformanceIndicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
