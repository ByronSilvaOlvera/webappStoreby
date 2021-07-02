import { Component, OnInit } from '@angular/core';
import { Store } from '../../../interfaces/store';
import { Subscription } from 'rxjs';
import { FunctionCategory } from '../../category/function-category';
import { SweetAlertIcon } from 'sweetalert2';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.component.html',
  styleUrls: ['./detail-store.component.scss']
})
export class DetailStoreComponent implements OnInit {

  store : Store = {};
  subscription: Subscription;
  panelstatus :boolean = false;
  classtext:string = '';
  btndelete:boolean = false;
  constructor(private _srvStore: StoreService) {
    this.subscription = _srvStore.getList().subscribe(
      data => {
        if(data.id == 0){
          this.panelstatus = false;
          this.store = {};
        }else{
          this.store       = data.data!;
          this.panelstatus = true;
          this.classtext   = data.styles?.color!;
          this.btndelete   = data.styles?.status ? false : true;
        }
      }
    )
   }

  ngOnInit(): void {
  }

  onDelete(id:number){
    this._srvStore.deleteEntity(id).subscribe(
      data => {
        if(data.ok){
          this._srvStore.addDelete(id);
          this.onMessage('Success',`Delete ID ${id} successfully!`,'success','info');
        }else{
          
          this.onMessage('Error',`Error delete`,'error','info');
        }
      }
    )
  }

  onList(){
    new FunctionCategory().onSelectTab('pills-home-tab');
  }

  onMessage(title:string, text:string, icon:SweetAlertIcon, confirm: string){
    new FunctionCategory().msgPage(title, text, icon, confirm)
  }

}
