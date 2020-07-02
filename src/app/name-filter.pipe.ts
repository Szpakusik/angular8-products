import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class NameFilterPipe implements PipeTransform {

  transform(products: any, term: any): any {
    console.log(term);
    
    if( term === undefined ) return products;

    return products.filter( (product)=>{
      return product.name.toLowerCase().includes(term.toLowerCase());
    } );

  }

}
