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

  tempId:number = -1;

  tempProduct:{
    name:string,
    price: any,
    photo: string,
    description: string,
    category: string,
    weight: string,
    id: number
  } = {
    name:"",
    price: 0,
    photo: "",
    description: "",
    category: "",
    weight: "",
    id: -1
  }

  tempOption:"";
  tempOptionPrice=0;

  constructor(
    private api: ApiService
    
  ) {}

  public uploader: FileUploader = new FileUploader({ url: "http://api.projekt2.webplace.pl/upload/photo", itemAlias: 'file' });

  getProducts() {
    this.api.getData()
      .subscribe(data => {
        this.products=[];
        for (const d of (data as any)) {

          this.products.push( new Product(
            d.name,
            d.price,
            "http://api.projekt2.webplace.pl/upload"+d.photo,
            d.nutritional_table,
            d.category,
            d.id,
            d.weight
          ) )
        } 
      this.prodMeta.count = this.products.length;

      }
    );
  }

  addProduct() {

    if( !confirm('Produkt gotowy do dodania?') ) return false;
    else if(!this.tempId){
      console.log(this.tempProduct);
      this.uploader.uploadAll();
    }
    else{
      if(this.uploader.getNotUploadedItems().length){

        this.uploader.uploadAll();

      }else{

        this.api
          .changeData(this.tempProduct)
          .subscribe(resp => {
            console.log(resp);
          });

      }
    }

  }

  addPrice(id, p_option, price) {
    this.api
      .addPriceData({id, p_option, price})
      .subscribe(resp => {
        console.log(resp);
      });
  }

  deletePrice(p_option, prodId){
    this.api
      .deletePriceData({ p_option, prodId })
      .subscribe(resp => {
        console.log(resp);
      });
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
  setTempCategory( cat: string ){
    this.tempProduct.category = cat;
  }
  setTempId( id: number ){
    console.log("id in setTempId");
    console.log(id);
    
    this.tempId = id;
  }

  cleanTempObject(){
    this.tempId = -1;
    this.tempProduct = {
      name:"",
      price: 0,
      photo: "",
      description: "",
      category: "",
      weight: "",
      id: -1
    }
  }

  setIsEditing( status:boolean ){
    this.isEditing = status;
    console.log(this.tempId);
    this.api
      .addData(this.tempProduct)
      .subscribe(resp => {
        console.log(resp);
      });
    
  }

  setTempObject(){
    this.api
      .getSingle(this.tempId)
      .subscribe( (resp:any) => {
        console.log(resp);
        this.tempProduct = resp;
        this.tempProduct.name= resp.name,
        this.tempProduct.price= resp.price,
        this.tempProduct.photo= resp.photo,
        this.tempProduct.description= resp.nutritional_table,
        this.tempProduct.category= resp.category,
        this.tempProduct.weight= resp.weight,
        this.tempProduct.id= resp.id
      });
  }

  validate(){
    console.log(this.tempProduct.name.length > 0 &&
      this.tempProduct.price > 0 &&
      this.tempProduct.description.length > 0 &&
      this.tempProduct.category.length > 0 &&
      this.tempProduct.weight.length > 0);
    
    return this.tempProduct.name.length &&
    this.tempProduct.price &&
    this.tempProduct.description.length &&
    this.tempProduct.category.length &&
    this.tempProduct.weight.length
  }

  ngOnInit(): void {
    this.getProducts();


    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        
      if(!this.tempId){

        let res = JSON.parse(response)
        this.tempProduct.photo = res.filename;
        this.api
        .addData(this.tempProduct)
        .subscribe(resp => {
          console.log(resp);
        });

      }else{

        let res = JSON.parse(response)
        this.tempProduct.photo = res.filename;
        this.api
          .changeData(this.tempProduct)
          .subscribe(resp => {
            console.log(resp);
          });

      }

        

    };
  }

}
