import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// const localUrl = "app/utils/smartphones.json";
const localUrl = 'assets/smartphones.json';
const remoteUrl = 'https://api.z-dowozem.com/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) { }

  getData() {
    return this.http.get(remoteUrl);
  }
  getSmartphone() {
    return this.http.get(localUrl);
  }
}
