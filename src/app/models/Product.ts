export class Product{
    constructor(
      public name: string,
      public price: Object,
      public photo: string,
      public description: string,
      public category: string,
      public id: number,
      public weight: string,
    ){}
}