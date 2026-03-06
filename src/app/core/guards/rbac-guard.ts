import { CanActivateFn } from '@angular/router';

export const rbacGuard: CanActivateFn = (route, state) => {
  return true;
};
