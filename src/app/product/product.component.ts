import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() public item: Product;

  priceOptionId: number = 0;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.item);
    
  }

  changePriceOption(option:number):void {
    this.priceOptionId = option;
  }


}
