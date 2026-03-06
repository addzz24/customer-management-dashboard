import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MenuItem } from '../../core/types/types';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  /**
   * DESCRIPTION :
   * - Sidebar component currently offers only dashboard route
   * - Future scope :
   *    -- RBAC Guard can be utilized here for access control of menu based routes
   *    -- More new sections for navigation
   */

  isOpen = signal(true);
  currentUrl!: string;

  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'analytics', label: 'Analytics', route: '/analytics' },
    { icon: 'person', label: 'Customers', route: '/customers' },
  ];

  router = inject(Router);

  ngOnInit(): void {
     this.currentUrl = this.router.url;
     console.log(this.currentUrl)
  }

  toggleSidebar() {
    this.isOpen.update((v) => !v);
  }

  onItemClick(item: MenuItem) {
    this.router.navigate([item.route]);
  }

  isActivated(menu:string){
    return this.currentUrl.includes(menu)
  }
}
