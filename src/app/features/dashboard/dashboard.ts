import { Component } from '@angular/core';
import { KeyPerformanceIndicator } from '../key-performance-indicator/key-performance-indicator';

@Component({
  selector: 'app-dashboard',
  imports: [KeyPerformanceIndicator],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
