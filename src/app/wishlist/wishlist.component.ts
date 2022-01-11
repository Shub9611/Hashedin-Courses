import { Component, OnInit } from '@angular/core';
import { DataLayerService } from '../data-layer.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  dlService:DataLayerService;
  subscription;
  wishLstCourses;

  constructor(dlService: DataLayerService) {
    this.dlService = dlService;
    this.wishLstCourses = this.getWishList();
  }

  ngOnInit(): void {
    this.subscription = this.dlService.wishlistChanged.subscribe(
      () => {
        this.wishLstCourses = this.dlService.getWishlist();
      }
    );
  }

  getWishList(){
    return this.dlService.getWishlist();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
