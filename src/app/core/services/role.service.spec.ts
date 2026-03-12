import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Role', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default role as admin', () => {
    const role = service.getRole();
    expect(role).toBe('admin');
  });

  it('should update role to manager', () => {
    service.setRole('manager');

    expect(service.getRole()).toBe('manager');
  });

  it('should update role to viewer', () => {
    service.setRole('viewer');

    expect(service.getRole()).toBe('viewer');
  });

  it('should update previous role when setRole is called again', () => {
    service.setRole('manager');
    service.setRole('viewer');

    expect(service.getRole()).toBe('viewer');
  });
});
