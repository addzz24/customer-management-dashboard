import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { rbacGuard } from './rbac-guard';
import { RoleService } from '../services/role.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('rbacGuard', () => {
  let mockRoleService: any;
  let mockRouter: any;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => rbacGuard(...guardParameters));

  beforeEach(() => {
    mockRoleService = {
      getRole: jasmine.createSpy(),
    };

    mockRouter = {
      navigate: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: RoleService, useValue: mockRoleService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });


  it('should allow access when role is permitted', () => {
    mockRoleService.getRole.and.returnValue('admin');
    const route = {
      data: { roles: ['admin', 'manager'] },
    };
    const result = executeGuard(route as any, {} as any);
    expect(result).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });


  it('should not allow access and redirect when role is not permitted', () => {
    mockRoleService.getRole.and.returnValue('user');
    const route = {
      data: { roles: ['admin', 'manager'] },
    };

    const result = executeGuard(route as any, {} as any);
    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });


  it('should allow access when roles are not defined for other components', () => {
    mockRoleService.getRole.and.returnValue('user');
    const route = {
      data: {},
    };
    const result = executeGuard(route as any, {} as any);
    expect(result).toBeTrue();
  });

});
