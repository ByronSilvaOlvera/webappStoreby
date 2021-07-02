import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { SweetAlertIcon } from 'sweetalert2';
import { ProductService } from '../../../services/product.service';
import { FunctionCategory } from '../../category/function-category';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  product : Product = {category:{}};
  subscription: Subscription;
  panelstatus :boolean = false;
  classtext:string = '';
  btndelete:boolean = false;

  constructor(private _srvproduct : ProductService) {
    this.product = {category:{}};
    this.subscription = this._srvproduct.getListP().subscribe(
      data => {     
        
        if(data.id == 0){
          this.panelstatus = false;
          this.product = {category:{}};
        }else{
          this.product     = data.data!;
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
    this._srvproduct.deleteEntity(id).subscribe(
      data => {
        if(data.ok){
          this._srvproduct.addDelete(id);
          this.onMessage('Success',`Delete ${id} successfully!`,'success','info');
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
