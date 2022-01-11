import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataLayerService } from '../data-layer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subscription;
  allCourses;
  p;
  count: number = 5;

  constructor(private dlService:DataLayerService) {
    this.dlService = dlService;
   }

  ngOnInit(): void {
    this.dlService.allCourses.subscribe(courses => this.allCourses = courses);
  }
}
