import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, pipe, Subject, of } from 'rxjs';
import { Category, CategoryElement, CategoryId, DataCategory, PostResponse } from '../interfaces/category';

import { catchError, map, tap  } from "rxjs/operators";
import { Product, ProductStore, ListProduct, ProductCreate, ProductGet, Style, ProductOne, PagesProduct, ProductStoreForm, UpdateResponse } from '../interfaces/product';
import { ResponseProduct, ProductRow } from '../interfaces/product-row';
import { ServiceError } from '../interfaces/service-msg';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }
  urlbase = 'http://localhost:8092/api/'

  Store : ProductStore={id:0,page:1,consult:false,search:[]}
  private SubStore$ = new Subject<ProductStore>();

  

  addListPage(data: PagesProduct){
    this.Store.List    = data.products;
    this.Store.page    = data.page;
    this.Store.pagemax = data.count;
    this.SubStore$.next(this.Store);
  }

  addListSearch(data: PagesProduct){
    this.Store.search = data.products;
    this.Store.sepage    = data.page;
    this.Store.sepagemax = data.count;
    this.SubStore$.next(this.Store);
  }

  addListP(data: Product[]){
    //this.Store.id = data[0].id
    this.Store.List = data;
    //this.Store.data = data[0];
    this.SubStore$.next(this.Store);
  }
  addStatusGrid(status:boolean){
    this.Store.consult = status ;
    this.SubStore$.next(this.Store);
  }
  addListOption(id:number, color:string,status:boolean){
    this.Store.id = id;
    this.Store.List?.map( x => {
    if( x.id === id){ this.Store.data = x;}  
    }) ;
    this.Store.styles = { color:color,status:status }        
    
    this.SubStore$.next(this.Store);
  }
  

  addCreate(id:number){
    this.Store.id = id;
    this.Store.ok = true;
    this.SubStore$.next(this.Store);
  }
  addSave(id:number, data:Product){
    this.Store.id = id;
    this.Store.data = data;
    this.Store.List?.push(data);
    this.Store.ok = false;
    this.Store.styles = { color:'text-info', status:true }
    this.SubStore$.next(this.Store);
  }
  addUpdateInit(){
    this.Store.ok = false;
    this.Store.styles = { color:'text-warning', status:false }
    this.SubStore$.next(this.Store);
  }
  addUpdate(id:number){
    this.Store.id = id;
    this.getAllEntity().subscribe( resp => {
      this.Store.List = resp.products;
      this.Store.data = resp.products?.filter(x => x.id === id )[0];
    });
    this.SubStore$.next(this.Store);
  }
  
  addDetail(style:Style){
    this.Store.styles = style;  
    this.SubStore$.next(this.Store);
  }
  
  addDelete(id:number){
    this.Store.id = 0;
    this.Store.List = this.Store.List?.filter( x => x.id !== id );
    this.SubStore$.next(this.Store);
  }

  getListP(): Observable<ProductStore>{
    return this.SubStore$.asObservable();
  }


  ////



  getAllEntity() : Observable<ListProduct>{
    let url = `${this.urlbase}product/`;
    return this.http.get<ListProduct>(url);
    //.pipe( rs => rs.products )
    // .pipe(
    //   catchError( err => of(null) )
    // );
  }

  /** return 20 product  */ 
  searchEntity(name : string) : Observable<PagesProduct | null>{
    let url = `${this.urlbase}product/search/${name}/`;
    return this.http.get<PagesProduct>(url)
    .pipe(
      catchError( err => of(null))
    );
  }


  //PAGINACION 

  /**  return 10 product pages, 
   * count amount the product bd, 
   * size amount the product in the array*/ 
  pageEntity(pg: number): Observable<PagesProduct|string>{
    let url = `${this.urlbase}product/pages/${pg}/`
    return this.http.get<PagesProduct>(url)
    .pipe(
      catchError( err => of(`Error Paginacion: ${err} `) )
    )
  }

  /** 
   * return array  Product y Store
   * 
   * */ 
   getListEntidad(page:number): Observable<PagesProduct | string >{
    let url = `${this.urlbase}product/pages/list/${page}`;
    return this.http.get<PagesProduct>(url)
    .pipe(
      catchError ( err => of(`Error Paginacion: ${err} `))
    )
  }


  /** add un product */ 
  addEntity(data : Product) : Observable<ProductCreate | string >{

    let url = `${this.urlbase}product/add`
    return this.http.post<ProductCreate>(url , data)
    .pipe(
      catchError( err => of(`Error ${err}`) )
    );
  }

  /** actualiza el product
   * */ 
  updateEntity(data : Product, id : number) : Observable<UpdateResponse> {

    let url = `${this.urlbase}product/update/${id}`
    return this.http.put<UpdateResponse>(url, data);
  }

  // Return un Product
  getEntityOne(id : number) : Observable<ProductOne >{

    let url = `${this.urlbase}product/${id}`
    return this.http.get<ProductOne>(url);
      // .pipe(
      //   catchError( err => of(null))
      // )
  }

  // Return Product ID y store
  getEntityToMuch(id : number) : Observable<ProductStoreForm | null >{
    let url = `${this.urlbase}product/${id}`
    return this.http.get<ProductStoreForm>(url)
    .pipe(
      catchError( err => of(null))
    );
  }

  

  deleteEntity(id : number) : Observable<ProductCreate> {

    let url = `${this.urlbase}product/delete/${id}`
    return this.http.delete<ProductCreate>(url);
  }

}
