import { Component, OnInit } from '@angular/core';
import { Wishlist } from '../wishlist';
import { NavigationEnd, Router } from '@angular/router';
import { WishlistService } from 'src/service/wishlist.service';
import { LoginService } from '../login.service';
import { lastValueFrom } from 'rxjs';
import { User } from 'User';
import { BooksToBuy } from 'BooksToBuy';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  userId!: number;
  wishlist!: Wishlist;
  booksToBuy!: BooksToBuy[];
  searchItem = '';

  mySubscription: any;


  constructor(
    private WishlistService: WishlistService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.getWishlistProduct();
  }

  getWishlistProduct(){
    this.WishlistService.sub.subscribe((res) => {
      this.wishlist = res;
    });
  }



checkLoginStatus(){
  this.loginService.checkLoginStatus().subscribe({
    next: (res) => {
      if (res.status === 200) {
        let body = <User>res.body;
        if (body.role === 'Customer') {
          this.userId = body.id;
          this.WishlistService.getWishlistFromCustomerPage(String(this.userId));
        }
      }
    },
    error: (err) => {
      if (err.status === 400) {
        this.router.navigate(['']);
      }
    },
  });
}

onDeleteButtonClick(productId: number) {
  this.WishlistService.deleteProductFromWishlist(String(productId), String(this.userId)).subscribe({
      next: (res) => {
        if (res.status === 200) {
          let body = <Wishlist>res.body;
          this.wishlist = body

        }
      },
      error: (err) => {
      },
    });
}

refreshPage(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentRoute]);
  })
}

}
