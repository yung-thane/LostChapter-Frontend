import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Wishlist } from 'src/app/wishlist';

import { Products } from 'src/app/Products';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) {}
  sub: Subject<Wishlist> = new Subject();
  items: Products[] = [];
  p!: Products;

  addToWishlist(pId: string, quantity: string, id: string) {
    let parameter = new HttpParams();
    parameter = parameter.append('productId', pId);
    parameter = parameter.append('quantity', quantity);
    return this.http.post(`http://localhost:8081/wishlist/${id}`, 
     
      {},
      {
        params: parameter,
        withCredentials: true,
        observe: 'response',
      }
    );
  }
 
  getWishlistFromCustomerPage(userId: string) {
    return this.http.get<Wishlist>(`http://localhost:8081/users/${userId}/wishlist`, {
        withCredentials: true
      }).subscribe((res)=> {
        this.sub.next(res);
      })
  }

  deleteProductFromWishlist(bookId: string, userId: string) {
    return this.http.delete(`http://localhost:8081/users/${userId}/wishlist`, {
      withCredentials: true,
      observe: 'response',
      params: {
        'bookId': bookId,
      },
    });
  }
}
