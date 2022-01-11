import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataLayerService } from '../data-layer.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseItems;
  courseItem;
  id;

  constructor(private dlService:DataLayerService, private activatedRoute:ActivatedRoute) {
    this.dlService.allCourses.subscribe(course => this.courseItems = course);
    this.id = this.activatedRoute.snapshot.params['id'];
    this.courseItems.forEach(element => {
      if(element.id === this.id){
        this.courseItem = element;
      }
    });
   }

  ngOnInit(): void {
  }

  addToCart(id){
    if(this.courseItem.id === id){
      this.dlService.addToCart(Object.assign({}, this.courseItem));
    }
  }

  addToWishList(id){
    if(this.courseItem.id === id){
      this.dlService.addToWishlist(Object.assign({}, this.courseItem));
    }
  }

}
