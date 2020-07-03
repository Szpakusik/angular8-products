import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';
import { Product } from './models/Product';


const localUrl = 'http://localhost:3002/upload';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) { }

  getData() {
    return this.http.get(localUrl+"/products");
  }

  deleteData(id: any): Observable<any> {
    return this.http.post(localUrl+"/delete", {id} );
  }






  // updatePrices( products: Product[] ): Observable<any> {
  //   return this.http.post<Product>(localPriceUrl, products)
  //     .pipe(
  //       catchError(this.handleError('addSmartphone', products))
  //     );
  // }

  // addProduct(product: Product): Observable<any> {
  //   return this.http.post<Product>(localUrl+"/products", product)
  //     .pipe(
  //       catchError(this.handleError('addSmartphone', product))
  //     );
  // }

  // getSmartphone(): Observable<any> {
  //   return this.http.get<Product[]>(localUrl)
  //   .pipe(
  //     retry(3), catchError(this.handleError<Product[]>('getSmartphone', [])));
  // }
  


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }

}
