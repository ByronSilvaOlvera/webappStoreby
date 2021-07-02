import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { FunctionCategory } from '../category/function-category';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ViewUxService } from '../../services/view-ux.service';
import { Menu } from '../../interfaces/menu';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: number = 0;
  subscription: Subscription;
  menu:Menu={};
  
  constructor(private _srvproduct : ProductService,
    private spinner: NgxSpinnerService 
    ,private toastr: ToastrService
    ,private _srvMenu: ViewUxService) 
    { 
      this.subscription = this._srvproduct.getListP().subscribe(
        data =>{
          this.id = data.id!;
        })

        this._srvMenu.getMenuOption().subscribe(data => this.menu = data );
    }
 
  ngOnInit(): void {

    this.spinner.show();
   
    this._srvproduct.getListEntidad(1).subscribe(
      data => {
        if(typeof data === 'string'){
          this.toastr.error( data , 'Error Web Service');
          this.spinner.hide();
        }else{
          if(data.ok){
            this._srvproduct.addListPage(data)
          }else{
            this.toastr.warning( data.message , 'Paginations complete!');
          }
          this.spinner.hide();
        }
      }
    )
  }

  onListPro(){
    this._srvproduct.addStatusGrid(false);
  }

  onCreate(){
    //this.onTab('pills-create-tab');
    //inicio id =0
    this._srvproduct.addCreate(0);
    //end save id save || 
  }

  onUpdate(){
    this._srvproduct.addUpdateInit();
  }

  ondetail(){
    var style ={
      color : 'text-info',
      status: true,
    }
    this._srvproduct.addDetail(style);
  }

  ondelete(){
    var style ={
      color : 'text-danger',
      status: false,
    }
    this._srvproduct.addDetail(style);
  }
  onConsult(){
    this._srvproduct.addStatusGrid(true);
  }

  onTab(name:string){
    new FunctionCategory().onSelectTab(name);
  }

}
