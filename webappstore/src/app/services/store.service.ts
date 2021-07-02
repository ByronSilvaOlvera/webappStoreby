import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store, GetStore, ListStore, StoreSub, Style } from '../interfaces/store';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  storeSub : StoreSub = { id : 0 };
  private idChangeStore$ = new Subject<StoreSub>();

  urlbase = 'http://localhost:8092/api/'
  constructor(private http : HttpClient) { }

  addList(data : Store[] ){
    this.storeSub.list = data;
    console.log(this.storeSub);
    this.idChangeStore$.next(this.storeSub);
  }

  getList(){
    return this.idChangeStore$.asObservable();
  }

  //CREATE
  addCreate(id:number){
    this.storeSub.id = id;
    this.storeSub.ok = true;
    this.idChangeStore$.next(this.storeSub);
  }
  addSave(id:number, data:Store){
    this.storeSub.id = id;
    this.storeSub.data = data;
    this.storeSub.list?.push(data);
    this.storeSub.ok = false;
    this.storeSub.styles = { color:'text-info', status:true }
    this.idChangeStore$.next(this.storeSub);
  }

//UPDATE
  addUpdateInit(){
    this.storeSub.ok = false;
    this.storeSub.styles = { color:'text-warning', status:false }
    this.idChangeStore$.next(this.storeSub);
  }
  addUpdate(id:number){
    this.storeSub.id = id;
    this.getAllEntity().subscribe( resp => {
      this.storeSub.list = resp.stores;
      this.storeSub.data = this.storeSub.list?.filter( x => x.id === id)[0];  
      this.idChangeStore$.next(this.storeSub);
    });
  }
  // DETAIL DELETE
  addDetail(style:Style){
    this.storeSub.styles = style;  
    this.idChangeStore$.next(this.storeSub);
  }
  addDelete(id:number){
    this.storeSub.id = 0;
    this.storeSub.list = this.storeSub.list?.filter( x => x.id !== id );
    this.idChangeStore$.next(this.storeSub);
  }

  // GRID

  addListOption(id:number, color:string,status:boolean){
    this.storeSub.id = id;
    this.storeSub.data = this.storeSub.list?.filter( x => x.id === id)[0]! ;
    console.log(this.storeSub.data);
    
    this.storeSub.styles = { color:color,status:status }        
    
    this.idChangeStore$.next(this.storeSub);
  }

  // API

  getAllEntity() : Observable<ListStore>{
    let url = `${this.urlbase}store/`;
    return this.http.get<ListStore>(url);
    //.pipe( rs => rs.products )
    // .pipe(
    //   catchError( err => of(null) )
    // );
  }

  addEntity(data : Store) : Observable<GetStore>{

    let url = `${this.urlbase}store/add`
    return this.http.post<GetStore>(url , data);
  }

  updateEntity(data : Store, id : number) : Observable<GetStore> {

    let url = `${this.urlbase}store/update/${id}`
    return this.http.put<GetStore>(url, data);
  }

  getEntityOne(id : number) : Observable<GetStore | null>{

    let url = `${this.urlbase}store/${id}`
    return this.http.get<GetStore>(url)
      .pipe(
        catchError( err => of(null))
      )
  }

  deleteEntity(id : number) : Observable<GetStore> {

    let url = `${this.urlbase}store/delete/${id}`
    return this.http.delete<GetStore>(url);
  }



}
