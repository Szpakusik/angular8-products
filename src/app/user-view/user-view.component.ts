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
  price_from: number = null;
  price_to: number = null;
  category: string = "wszystkie";
  prodMeta:{ count:number } = { count:0 };

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
            d.nutritional_table,
            d.category,
            d.id
          ) )
        } 
      this.prodMeta.count = this.products.length;

      }
    );
  }

  showMore(){
    this.counter += 3;
  }

  resetCounter(){
    this.counter = 3;
  }

  setCategory( cat: string ){
    this.category = cat;
    this.counter = 3;
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
