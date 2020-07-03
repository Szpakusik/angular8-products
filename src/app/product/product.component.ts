import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/Product'
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() public item: Product;
  @Input() public isAdmin: boolean;

  @Output() public onDelete = new EventEmitter();
  @Output() public onEditClick = new EventEmitter();
  
  priceOptionId: number = 0;

  spresp: any;
  postdata: Product;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    // console.log(this.item);
    
  }
  
  deleteProduct(id: any) {
    
    if( !confirm('Na pewno chesz dodać produkt?') ) return false;

    this.api
      .deleteData(id)
      .subscribe(resp => {
        console.log(resp);
        this.onDelete.emit(null)
        // return this.spresp.push(resp);
      });
  }

  handleEditClick(){
    this.onEditClick.emit(null)
  }

  changePriceOption(option:number):void {
    this.priceOptionId = option;
  }


}
