import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';
import { Product } from './models/Product';


const localUrl = 'http://api.projekt2.webplace.pl/upload';

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

  addPriceData(priceData){
    return this.http.post(localUrl+"/prices/add", priceData );
  }
  deletePriceData(priceData){
    return this.http.post(localUrl+"/prices/delete", priceData );
  }

  getSingle(id){
    return this.http.get(localUrl+"/product/"+id);
  }

  changeData(productData){
    return this.http.put(localUrl+"/product", productData);
  }

  // updatePrices( products: Product[] ): Observable<any> {
  //   return this.http.post<Product>(localPriceUrl, products)
  //     .pipe(
  //       catchError(this.handleError('addSmartphone', products))
  //     );
  // }



}
