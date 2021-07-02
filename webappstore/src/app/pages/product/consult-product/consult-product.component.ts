import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consult-product',
  templateUrl: './consult-product.component.html',
  styleUrls: ['./consult-product.component.scss']
})
export class ConsultProductComponent implements OnInit {

  msgValidation:boolean = false;
  name:string;
  status:boolean = false;
  //subscription: Subscription;
  constructor(private _svrproduct : ProductService
    ,private toastr: ToastrService) { 
    this.name='';
    // this.subscription = this._svrproduct.getListP().subscribe( 
    //   data => {
        
    //   }
    //  )
  }

  ngOnInit(): void {
  }

  onSearch(){
    console.log(this.name, this.name.length);
    
    if(  this.name.length > 0 ){
      this.searchProduct(this.name);
      this.status = true;
    }else{
      this.status = false;
      this.toastr.warning('Enter a data','Consult')
    }
  }

  searchProduct(name : string){
    this._svrproduct.searchEntity(name).subscribe(
      data => {
        if(data != null){
          this._svrproduct.addListSearch(data);
        }
      }
    )  
  }

}
