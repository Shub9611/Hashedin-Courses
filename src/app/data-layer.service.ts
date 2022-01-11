
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Course } from 'src/Interfaces/course';
import { CommonService } from './common.service';

@Injectable()
export class DataLayerService {
  private profile = [{}];
  commonService : CommonService;
  http:HttpClient;
  allCourses = new BehaviorSubject({});
  wishlistCourses: any[];
  wishlistChanged = new Subject<void>();
  cartCourses: any[];
  cartCoursesChanged = new Subject<void>();

  constructor(commonService: CommonService, http:HttpClient) {
    this.commonService = commonService;
    this.http = http;
    this.getAllCourses();
    this.wishlistCourses = [];
    this.cartCourses = [];
  }

  getProfile(){
    return this.profile;
  }

  updateProfile(formValue) {

    this.profile.splice(0, this.profile.length);
    this.profile.push(formValue);
    // {
    //   DisplayName: formValue.DisplayName,
    //   FirstName: formValue.FirstName,
    //   LastName: formValue.LastName,
    //   AboutYourself: formValue.AboutYourself,
    //   AreaOfInterest: formValue.areasofinterest,
    //   Designation: formValue.Designation,
    //   Experience: formValue.Experience,
    //   Expertise: formValue.Expertise,
    //   Role: formValue.Role
    // }

    this.commonService.alertMsg('Your Profile is saved!');
    console.log(this.profile);
  }

  getAllCourses(){
    return this.http.get('../assets/assignment_sample.json').subscribe(data => this.allCourses.next(data));
  }

  getWishlist(){
    return this.wishlistCourses;
  }

  addToWishlist(object){
    const pos = this.wishlistCourses.findIndex((char) => {
      return char.id === object.id;
    });

    if(pos !== -1){
      this.commonService.alertMsg('Already exists in wishlist');
      return;
    }

    this.wishlistCourses.push(object);
    this.wishlistChanged.next();
    this.commonService.alertMsg('Course added to wishlist');
  }

  getCartCourses(){
    return this.cartCourses;
  }

  addToCart(object){
    const pos = this.cartCourses.findIndex((char) => {
      return char.id === object.id;
    });

    if(pos !== -1){
      this.commonService.alertMsg('Already exists in cart');
      return;
    }

    this.cartCourses.push(object);
    this.cartCoursesChanged.next();
    this.commonService.alertMsg('Course added to cart');
  }

  cartCheckout(){
    this.cartCourses.splice(0, this.cartCourses.length);
    this.commonService.alertMsg('Checked out successfully');
  }

  deleteFromWishlist(id){
    var index = this.wishlistCourses.findIndex(item => item.id === id);
    if(index !== -1){
      this.wishlistCourses.splice(index,1);
      this.commonService.alertMsg('Item removed from wishlist');
    }
    return;
  }
}
