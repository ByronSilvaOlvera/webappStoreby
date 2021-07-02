import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CategoryElement, DataCategory, PostResponse } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

import { FunctionCategory } from '../function-category';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss']
})
export class DetailCategoryComponent implements OnInit, OnDestroy {

  id:number = 0;
  textcolor:boolean=false;
  subscription: Subscription;
  categoryDetail : CategoryElement = {};
  
  constructor( private _srvCategoty : CategoryService 
    ,private spinner: NgxSpinnerService
    ) 
  {
    this.spinner.show();
    this.subscription = this._srvCategoty.getList().subscribe(data => {
      this.id = data.id!;
      this.categoryDetail = data.data!;
      this.textcolor = data.estado!;
      this.spinner.hide();
    })
  }


  onDelete(){
    this._srvCategoty.deleteEntity(this.id!).subscribe(
      (resp: PostResponse ) => {
        if(resp.ok){

          Swal.fire({
            title: 'Successs',
            text: `Delete register ${this.id}`,
            icon: 'success',
            confirmButtonText: 'Info'
          })

          this._srvCategoty.addDelete(this.id!); 
          this.onList();
          
        }else{
          new FunctionCategory().msgPage('Error','Do you want too continue','error','info');
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    //console.log(this.id);
  }

  onList(){
    //this.lk.onSelectTab('pills-home-tab');
    new FunctionCategory().onSelectTab('pills-home-tab');
  }


}
