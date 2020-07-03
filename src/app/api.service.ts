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

  addData(productData){
    return this.http.post(localUrl+"/add", productData );
  }

  // updatePrices( products: Product[] ): Observable<any> {
  //   return this.http.post<Product>(localPriceUrl, products)
  //     .pipe(
  //       catchError(this.handleError('addSmartphone', products))
  //     );
  // }



}
