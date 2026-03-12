import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebar } from './sidebar';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router } from '@angular/router';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;
  let mockRouter: any;

  beforeEach(async () => {
     mockRouter = {
      url: '/dashboard',
      navigate: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideZonelessChangeDetection(),
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set current url on init', () => {
    component.ngOnInit();

    expect(component.currentUrl).toBe('/dashboard');
  });

  it('should toggle sidebar open state', () => {
    const initial = component.isOpen();

    component.toggleSidebar();

    expect(component.isOpen()).toBe(!initial);
  });

  it('should navigate when menu item is clicked', () => {
    const item = component.menuItems[0];

    component.onItemClick(item);

    expect(mockRouter.navigate).toHaveBeenCalledWith([item.route]);
  });

  it('should detect active menu item', () => {
    component.currentUrl = '/dashboard';

    const result = component.isActivated('/dashboard');

    expect(result).toBeTrue();
  });

  it('should return false for non active menu', () => {
    component.currentUrl = '/dashboard';

    const result = component.isActivated('/customers');

    expect(result).toBeFalse();
  });

  it('should have menu items defined', () => {
    expect(component.menuItems.length).toBeGreaterThan(0);

    expect(component.menuItems[0]).toEqual(
      jasmine.objectContaining({
        label: 'Dashboard',
        route: '/dashboard',
      }),
    );
  });
});
