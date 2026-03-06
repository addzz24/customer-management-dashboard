import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
private role = signal<'admin' | 'manager' | 'viewer'>('admin');

  getRole() {
    return this.role();
  }

  setRole(role: 'admin' | 'manager' | 'viewer') {
    this.role.set(role);
  }
}
