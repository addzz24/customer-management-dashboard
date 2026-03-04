import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('management-dashboard');

  ngOnInit(): void {
    const data = [10, 20, 30];
    const max = d3.max(data);
    console.log('Max value:', max);
  }
}

