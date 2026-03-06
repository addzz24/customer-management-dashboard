import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPerformanceIndicatorComponent } from './key-performance-indicator.component';

describe('KeyPerformanceIndicator', () => {
  let component: KeyPerformanceIndicatorComponent;
  let fixture: ComponentFixture<KeyPerformanceIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyPerformanceIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyPerformanceIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
