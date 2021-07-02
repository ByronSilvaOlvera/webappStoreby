import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { FunctionCategory } from '../../category/function-category';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
  styleUrls: ['./grid-product.component.scss']
})
export class GridProductComponent implements OnInit, OnDestroy {

  @Input() products : Product[] ;
  page : number = 0;
  pagemax : number = 0;
  classgrid:string="";
  classtbbody:string="";
  subscription: Subscription;
  
  
  constructor(private _srvproduct : ProductService
    ,private spinner: NgxSpinnerService
    ,private toastr: ToastrService
    ) {
    
    this.products = []
    this.subscription = this._srvproduct.getListP().subscribe(
      data => {
        this.products = data.consult? data.search! : data.List!;
        this.page     = data.consult? data.sepage! : data.page!;
        this.pagemax  = data.consult? data.sepagemax! : Math.round( data.pagemax! );
        this.classgrid  = data.consult? 'grid-consult' : 'grid';
        this.classtbbody  = data.consult? 'grid-body-consult' : 'grid-body';
        
        //console.log(data.List!); 
      }
    )
    



   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {    
      
  }
  //p: number = 1;

  onLeft(){
    this.page--;
    this.spinner.show();
    if( this.page >= 1  ){
      //console.log(this.page)
      this._srvproduct.pageEntity(this.page).subscribe(
        data => {
          if(typeof data === 'string'){
            this.toastr.error( data , 'Error Web Service');
            this.spinner.hide();
          }else{
            if(data.ok){
              this._srvproduct.addListPage(data); 
            }else{
              this.toastr.warning( data.message , 'Paginations complete!');
              this.page--;
            }
            this.spinner.hide();
          }
        })
    }else{
       this.spinner.hide();
       this.page++;
       this.toastr.info('Not exist Page negative!', 'Page!')
    }
  }
  
  onRight(){
    
    this.page++;
    this.spinner.show();
    // let max = (this.page *10);
    // let c = max - this.pagemax;
    //if( c < 10  ){
      this._srvproduct.pageEntity(this.page).subscribe(
        data => {
          if(typeof data === 'string'){
            this.toastr.error( data , 'Error Web Service');
            this.spinner.hide();
          }else{
            
            if(data.ok){
              this._srvproduct.addListPage(data);       
            }else{
              this.toastr.warning( data.message , 'Paginations complete!');
              this.page--;
            }
            this.spinner.hide();     
          }
        })
        //console.log(this.page)      
    //   }else{
    //     this.spinner.hide();  
    //     this.page--;
    //     this.toastr.warning('Not exist Page!', 'Page!',
    //     {
    //       positionClass : 'toast-bottom-right'
    //     })
    // }
  }

  onDetail(id:number){

    this._srvproduct.addListOption(id,'text-info',true);
    
    this.onTab('pills-detail-tab');

  }

  onDelete(id:number){
    
    //this._srvproduct.addListOption(id,'text-danger',false);
    this.onTab('pills-delete-tab');
  }
  onUpdate(id:number){
  
    //this._srvproduct.addListOption(id,'text-info',true);
    this.onTab('pills-update-tab');
  }
  onTab(name:string){
    new FunctionCategory().onSelectTab(name);
  }

  

}
