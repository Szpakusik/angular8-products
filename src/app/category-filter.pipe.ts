import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/Product';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(products: Product[], category: string): any {
    if( category === "wszystkie" ) return products;

    return products.filter( (product)=>{
      return product.category.toLowerCase() === category.toLowerCase();
    } );
  }

}



    

