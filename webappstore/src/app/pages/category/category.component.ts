import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryElement } from '../../interfaces/category';
import { FunctionCategory } from './function-category';
import { ViewUxService } from '../../services/view-ux.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  
  active : number = 1;
  id:number=0;
  menu:Menu={};
  subscription: Subscription;
  categories:CategoryElement[] = [];

  constructor(private _srvcategory : CategoryService
    ,private spinner: NgxSpinnerService
    ,private _srvMenu: ViewUxService
    ,private toastr: ToastrService
    ) 
    {
      this.subscription = this._srvcategory.getList().subscribe(
        data =>  {
          this.id = data.id!;
      })
      this.subscription = this._srvMenu.getMenuOption().subscribe(
        data => {
          this.menu = data
        })
     }

  ngOnInit(): void {
    this.spinner.show();
    this._srvcategory.getCategory().subscribe( 
      data => {      
        if( data!= null){
          this._srvcategory.addList(data);
          this.spinner.hide();
        }else{
          this.toastr.info('Not return data or ocurred a error!','Data incomplete');
        }
      }
    )
  }

  
  onSelectCreate(){
    // reseteo a 0 
    this._srvcategory.addFormCreate();
  }

  onSelectUpdate (){
    this._srvcategory.addUpdate(this.id);
  }

  onSelectDelete(){
    // exites id > 0
  }

  onSelectDetail(){
    //si existe id > 0
  }
  


}
