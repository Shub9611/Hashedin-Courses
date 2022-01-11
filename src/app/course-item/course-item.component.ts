import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/Interfaces/course';
import { DataLayerService } from '../data-layer.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() inWishListScreen;
  dlService:DataLayerService;
  presentInWishList;
  @Input() items;
  @Input() fromCart = false;

  constructor(dlService: DataLayerService) {
    this.dlService = dlService;
  }

  ngOnInit(): void {
    this.presentInWishList = this.dlService.getWishlist().findIndex(item => item.id === this.items.id) !== -1;
  }

  onTrashClick(id){
    this.dlService.deleteFromWishlist(id);
  }

  addToWishList(id){
    if(this.items.id === id){
      this.dlService.addToWishlist(Object.assign({}, this.items));
      this.presentInWishList = true;
    }
  }

  addToCart(id){
    if(this.items.id === id){
      if(this.inWishListScreen){
        this.dlService.deleteFromWishlist(id);
      }
      this.dlService.addToCart(Object.assign({}, this.items));
    }

  }

}
