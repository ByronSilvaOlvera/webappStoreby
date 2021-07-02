import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu';
import { Observable, pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewUxService {

  menu: Menu={};
  private subMenu$ = new Subject<Menu>();
  
  constructor() { 
    
  }

  getMenuOption(){
    return this.subMenu$.asObservable();
  }

  addMenuChoose(menu:Menu){
    this.menu = menu;
    this.subMenu$.next(this.menu);
  }



}
