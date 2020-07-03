import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/Product';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(products: Product[], price_from: number, price_to: number, prodMeta: { count:number } ): any {
    if( price_from === null && price_to === null ){
      prodMeta.count = products.length
      return products;
    } 
    
    let returned: Product[]= products.filter( (product)=>{
      console.log(price_from);
      console.log(price_to);

      if( price_from === null ) {
        return product.price[0].price <= price_to;
      }
      if( price_to === null ) {
        return product.price[0].price >= price_from;
      }
      return product.price[0].price <= price_to && product.price[0].price >= price_from;
    } );

    prodMeta.count = returned.length

    return returned;

  }

}


export class NameFilterPipe implements PipeTransform {

  transform(products: Product[], term: any): any {
    if( term === undefined ) return products;

    return products.filter( (product)=>{
      return product.name.toLowerCase().includes(term.toLowerCase());
    } );
  }

}