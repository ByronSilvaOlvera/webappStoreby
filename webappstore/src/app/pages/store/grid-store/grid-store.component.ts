import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/interfaces/store';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { FunctionCategory } from '../../category/function-category';

@Component({
  selector: 'app-grid-store',
  templateUrl: './grid-store.component.html',
  styleUrls: ['./grid-store.component.scss']
})
export class GridStoreComponent implements OnInit {

  stores : Store[] =[];
  id:number=0;
  subscription: Subscription;
  constructor(private _srvStore : StoreService) {
    this.subscription = this._srvStore.getList().subscribe(
      data =>{
        this.id = data.id!;
        this.stores = data.list!;
      })
   }

  ngOnInit(): void {
    
  }

  onDetail(id:number){

    this._srvStore.addListOption(id,'text-info',true);
    this.onTab('pills-detail-tab');

  }

  onDelete(id:number){
    
    this._srvStore.addListOption(id,'text-danger',false);
    this.onTab('pills-delete-tab');
  }
  onUpdate(id:number){
  
    this._srvStore.addListOption(id,'text-info',true);
    this.onTab('pills-update-tab');
  }

  onTab(name:string){
    new FunctionCategory().onSelectTab(name);
  }
  
}
