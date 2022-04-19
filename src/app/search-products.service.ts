import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  constructor(private http: HttpClient) { }

  public currentTabIndex = 1;

  getSearchResult(searchItem: string){
    return this.http.get(`http://localhost:8081/books/search/${searchItem}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/search/${searchItem}`, {
      observe: 'response'
    })
  }

  getSearchByGenre(genreId: number){
    return this.http.get(`http://localhost:8081/books/genre/${genreId}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/genre/${genreId}`, {
      observe: 'response'
    })
  }

  getBookBySales(){
    return this.http.get(`http://localhost:8081/books/sales`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/sales`, {
      observe: 'response'
    })
  }

  addToCart(productId: string, quantity: string, userId: string){
    let parameter = new HttpParams();
    parameter = parameter.append('bookId', productId);
    parameter = parameter.append('quantityToBuy', quantity);
    return this.http.post(`http://localhost:8081/users/{userId}/cart`, {},
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/users/${userId}/cart`, {},
      {
        "params": parameter,
        withCredentials: true,
        observe:'response'
      })
  }

  addToWishlist(productId: string, quantity: string, userId: string){
    let parameter = new HttpParams();
    parameter = parameter.append('bookId', productId);
    parameter = parameter.append('quantityToBuy', quantity);
    return this.http.post(`http://localhost:8081/users/{userId}/wishlist`, {},
      {
        "params": parameter,
        withCredentials: true,
        observe:'response'
      })
  }

  getBookById(bookId: number){
    return this.http.get(`http://localhost:8081/books/${bookId}`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/${bookId}`, {
      observe: 'response'
    })
  }

  getFeaturedBooks(){
    return this.http.get(`http://localhost:8081/books/featured`, {
      //`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/books/featured`, {
      observe: 'response'
    })
  }



}


