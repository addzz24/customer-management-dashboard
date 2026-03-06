import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatIconModule, MatBadgeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  /**
   * DESCRIPTION :
   * - Dummy navbar component
   * - Future scope :
   *    -- RBAC Guard can be utilized here for access control
   *    -- More new sections for navigation
   */
}
