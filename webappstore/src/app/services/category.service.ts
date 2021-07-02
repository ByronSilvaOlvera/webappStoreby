import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, Subject, of } from 'rxjs';
import { Category, CategoryElement, CategoryId, DataCategory, PostResponse } from '../interfaces/category';

import { catchError, map, tap  } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }
  urlbase = 'http://localhost:8092/api/'

  categoryStore : DataCategory = { id : 0 };
  private idChangeStore$ = new Subject<DataCategory>();

  addList(data : CategoryElement[] ){
    this.categoryStore.list = data;
    console.log(this.categoryStore);
    this.idChangeStore$.next(this.categoryStore);
  }

  /** return observable status */
  getList() : Observable<DataCategory>{
    return this.idChangeStore$.asObservable();
  }

  
  /** change state the element selection to form */
  addForm(data :  DataCategory){
    this.categoryStore.id         = data.id;
    this.categoryStore.colortitle = data.colortitle;
    this.categoryStore.estado     = data.estado;
    this.categoryStore.data       = data.data;
    this.categoryStore.ok = false;

    this.idChangeStore$.next(this.categoryStore);
  }

  addFormCreate(){
    this.categoryStore.id = 0;
    this.categoryStore.ok = true;
    this.idChangeStore$.next(this.categoryStore);
  }
  addFormSave(data:CategoryElement){
    this.categoryStore.id         = data.id;
    this.categoryStore.colortitle = "text-info";
    this.categoryStore.estado     = true;
    this.categoryStore.data       = data;
    this.categoryStore.list?.push(data);
    this.categoryStore.ok = false;
    this.idChangeStore$.next(this.categoryStore);
  }


  /** UPDATE INIT */
  addUpdate(id:number){
    this.categoryStore.data = this.categoryStore.list?.filter( o => o.id === id)[0];
    this.categoryStore.ok = false;
    this.categoryStore.colortitle = 'text-info'
    this.categoryStore.estado = true;
    this.idChangeStore$.next(this.categoryStore);
  }
  /** Update Save */
  addUpdateSave(id:number){
    this.getCategory().subscribe( resp => {
      this.categoryStore.list = resp;
      this.categoryStore.data = resp.filter(z => z.id === id)[0];
      this.idChangeStore$.next(this.categoryStore);
    })
  }

  /** Change state the element selection */
  addIdDetail(id: DataCategory) {
    this.categoryStore.id         = id.id;
    this.categoryStore.colortitle = id.colortitle;
    this.categoryStore.estado     = id.estado;
    this.categoryStore.data       = id.data;
    
    this.idChangeStore$.next(this.categoryStore);
  }

  addDelete(id: number){
    this.categoryStore.id = 0;
    this.categoryStore.list = this.categoryStore.list?.filter(x => x.id !== id );
    this.idChangeStore$.next(this.categoryStore);
  }



  // ////////////  URL

  /** ALL CATEGORY */
  getCategory() : Observable<CategoryElement[]>{

    let url = `${this.urlbase}category/`
    return this.http.get<Category>(url)
      .pipe(
        map( resp => resp.category! ),
        catchError( err => of([]) )
      )
  }

  getEntityOne(id : number) : Observable<CategoryElement | null>{

    let url = `${this.urlbase}category/${id}`
    return this.http.get<CategoryId>(url)
      .pipe(
        map( resp => resp.category! ),
        catchError( err => of(null))
      )
  }

  addCategory(data : CategoryElement) : Observable<PostResponse>{

    let url = `${this.urlbase}category/add`
    return this.http.post<PostResponse>(url , data);
  }

  updateEntity(data : CategoryElement, id : number) : Observable<PostResponse> {

    let url = `${this.urlbase}category/update/${id}`
    return this.http.put<PostResponse>(url, data);
  }

  deleteEntity(id : number) : Observable<PostResponse> {

    let url = `${this.urlbase}category/delete/${id}`
    return this.http.delete<PostResponse>(url);
  }

}



