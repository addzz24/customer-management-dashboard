import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from '../services/role.service';

export const rbacGuard: CanActivateFn = (route) => {

  const roleService = inject(RoleService);
  const router = inject(Router);

  const allowedRoles = route.data?.['roles'] as string[];
  const userRole = roleService.getRole();

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
