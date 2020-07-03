export class Product{
    constructor(
      public name: string,
      public price: number,
      private photo: string,
      private description: string,
      public category: string,
      public id: number,
    ){}
}