import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/Product';

@Pipe({
  name: 'filter'
})
export class NameFilterPipe implements PipeTransform {

  transform(products: Product[], term: any): any {
    if( term === undefined ) return products;

    return products.filter( (product)=>{
      return product.name.toLowerCase().includes(term.toLowerCase());
    } );
  }

}
