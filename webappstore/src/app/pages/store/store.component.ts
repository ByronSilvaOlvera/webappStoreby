import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { FunctionCategory } from '../category/function-category';
import { NgxSpinnerService } from 'ngx-spinner';
import { Menu } from '../../interfaces/menu';
import { ViewUxService } from '../../services/view-ux.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  id: number = 0;
  subscription: Subscription;
  menu:Menu={};
  
  constructor(private _srvStore : StoreService, 
    private spinner : NgxSpinnerService
    ,private _srvMenu: ViewUxService) {
    this.subscription = this._srvStore.getList().subscribe(
      data =>{
        this.id = data.id!;
      })  
      this._srvMenu.getMenuOption().subscribe(data => this.menu = data );
  }

  ngOnInit(): void {
    //this.onTab('pills-create-tab')
    this.spinner.show()
    this._srvStore.getAllEntity().subscribe(
      data => {
        this._srvStore.addList(data.stores!);        
        this.spinner.hide()
      }
    )
  }

  onCreate(){
    this._srvStore.addCreate(0);
  }

  onUpdate(){
    this._srvStore.addUpdateInit();
  }

  ondetail(){
    var style ={
      color : 'text-info',
      status: true,
    }
    this._srvStore.addDetail(style);
  }

  ondelete(){
    var style ={
      color : 'text-danger',
      status: false,
    }
    this._srvStore.addDetail(style);
  }
  onConsult(){

  }

  onTab(name:string){
    new FunctionCategory().onSelectTab(name);
  }

}
