import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/Product'

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  
  products: Product[] = [];
  smartphone: any[] = [];

  term: string = '';

  counter: number = 3;

  constructor(private api: ApiService) {}

  getProducts() {
    this.api.getData()
      .subscribe(data => {
        for (const d of (data as any)) {

          this.products.push( new Product(
            d.name,
            d.price,
            "https://api.z-dowozem.com/images/"+d.photo,
          ) )
        } 
      console.log(this.products)   
      }
    );
  }

  showMore(){
    this.counter += 3;
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
