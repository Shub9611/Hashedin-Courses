import { Component, OnInit } from '@angular/core';
import { DataLayerService } from '../data-layer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartCourses;
  subscription;
  fromCart = true;

  constructor(private dlService:DataLayerService) {
    this.cartCourses = this.getWishList();
  }

  ngOnInit(): void {
    this.subscription = this.dlService.cartCoursesChanged.subscribe(
      () => {
        this.cartCourses = this.dlService.getCartCourses();
      }
    );
  }

  getWishList(){
    return this.dlService.getCartCourses();
  }

  onCheckout(){
    this.dlService.cartCheckout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
