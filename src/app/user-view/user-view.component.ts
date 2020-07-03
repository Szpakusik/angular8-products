import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/Product'
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  @Input() public isAdmin: boolean;
  
  products: Product[] = [];
  smartphone: any[] = [];

  term: string = '';
  price_from: number = null;
  price_to: number = null;
  category: string = "wszystkie";
  prodMeta:{ count:number } = { count:0 };

  counter: number = 3;

  spresp: any;
  postdata: Product;

  isEditing: boolean = false;

  tempProduct:{
    name:string,
    price: number,
    photo: "",
    description: string,
    category: string,
    weight: string,
  } = {
    name:"",
    price: 0,
    photo: "",
    description: "",
    category: "",
    weight: "",
  }

  constructor(
    private api: ApiService
    
  ) {}

  public uploader: FileUploader = new FileUploader({ url: "http://localhost:3002/upload/photo", itemAlias: 'file' });

  getProducts() {
    this.api.getData()
      .subscribe(data => {
        this.products=[];
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

  addProduct() {
    // if( this.tempProduct.photo.length === 0 ) {
    //   alert("Najpierw dodaj zdjęcie!"); 
    //   return false;
    // }
    if( !confirm('Produkt gotowy do dodania?') ) return false;
    if( this.tempProduct.category.length ) {
      alert("Nadaj kategorię!")
      return false;
    }
    console.log(this.tempProduct);
    this.uploader.uploadAll()

  }

  // addPrices() {
  //   let tempTable = this.products.filter( (product) => { return product.price < 9 });
  //   tempTable.map( (prod) => { prod.price *= 2; return prod } )
  //   console.log(tempTable)
  //   this.api.updatePrices(tempTable)
  //     .subscribe(resp => {

  //       console.log(resp);
  //       return this.spresp.push(resp);

  //     });
  // }

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
  setTempCategory( cat: string ){
    this.tempProduct.category = cat;
  }

  setIsEditing( status:boolean ){
    this.isEditing = status;
  }

  ngOnInit(): void {
    this.getProducts();


    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        
        this.tempProduct.photo = response.filename;
        console.log(response);
        // alert('Your file has been uploaded successfully');
        this.api
          .addData(this.tempProduct)
          .subscribe(resp => {
            console.log(resp);
            return this.spresp.push(resp);
          });

    };
  }

}
