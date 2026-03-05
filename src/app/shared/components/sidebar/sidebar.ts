import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../types/dashboard.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  isOpen = signal(true);

  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'analytics', label: 'Analytics', route: '/analytics' },
    { icon: 'article', label: 'Reports', route: '/reports' },
  ];

  router = inject(Router);

  toggleSidebar() {
    this.isOpen.update((v) => !v);
  }

  onItemClick(item: MenuItem) {
    this.router.navigate([item.route]);
  }
}
