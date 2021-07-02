import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { FunctionCategory } from '../../category/function-category';
import Swal, { SweetAlertIcon }  from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { CategoryElement } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { Store } from 'src/app/interfaces/store';
import { StoreService } from 'src/app/services/store.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  subscription: Subscription;
  
  productForm  : FormGroup ;
  msgValidation: boolean = false;
  product      : Product ;
  mostrarForm  : boolean = false;
  mostrarMsg   : boolean = false;
  update       : boolean = false;
  idEntidad    : number = 0;
  categories   : CategoryElement[] = [];
  stores       : Store[] = [];
  selectedCar  : number = 0;
  

  constructor(private fb: FormBuilder
    ,private _srvproduct: ProductService
    ,private _srvcategory : CategoryService
    ,private _srvcstore : StoreService
    ,private spinner : NgxSpinnerService
    ,private toastr: ToastrService
    ) { 
      this.product = {category:{}};
      this.productForm = this.initForm(false);
      this.subscription = this._srvproduct.getListP().subscribe(
        data => {
                   
          //UPDATE
          if(data.id! > 0){
            this.product = data.data!;
            //console.log(this.product);
            
            this.idEntidad = data.id!;
            //mostrar el formulario
            this.mostrarForm = true;
            this.update = true;
            this.mostrarMsg= false;
            this.productForm = this.initForm(true);
          }
          // CREATE
          else{
            //mostrar formulario
            if(data.id == 0 && data.ok){
             // console.log('create');
              
              this.mostrarForm = true;
              this.update = false;
              this.mostrarMsg= false;
              this.productForm = this.initForm(false);
            }
            else{
              this.mostrarForm = false;
              this.mostrarMsg= true;
            }
          }
        }
      )
    }

  ngOnInit(): void {
    this.spinner.show();
    this._srvcategory.getCategory().subscribe(
      data => {
        if( data != null ){
          this.categories = data;
        }else{
          this.spinner.hide()
        }
      }
    )
    this.spinner.show();
    this._srvcstore.getAllEntity().subscribe(
      data => {
        if(data != null){
          this.stores = data.stores!;
          this.spinner.hide()
        }else{
          this.spinner.hide()
        }
      }
    )
  }

  onSubmit(){
    //console.log(this.productForm.value, this.productForm.invalid);
    
    if(this.productForm.invalid){
      this.toastr.warning( 'information incomplete!','Form! ')  
      
    }else{
      let doc:any = [];
      this.productForm.value.stores.forEach( (x:number) => {
        doc.push({id:x})
      })
      this.productForm.value.stores = doc;
      let docform = this.productForm.value
      //console.log(docform);

      if(this.update){
        this.onUpdate(docform);
      }else{
        this.onSave(docform);
      }
    }
  }

  onUpdate(docform:any){
    this._srvproduct.updateEntity(docform, this.idEntidad )
    .subscribe( data => {
      if(data.ok){
        this._srvproduct.addUpdate(this.idEntidad);
        //this.onTab('');
        this.onMessage('Sucess','Update Successfully!','success','info');
      }else{
        this.onMessage('Error!','Update errors','error','info');

      }
    })  
  }
  onSave(docform:any){
    this._srvproduct.addEntity(docform)
    .subscribe( resp => {
      if( typeof resp === 'string' ){
        //this.onMessage('Error!','Error the save entity!','error','info');
        this.toastr.error(resp , 'Error Server!');
      }
      else{
        if( resp.ok ){
          this._srvproduct.addSave(resp.data?.id!,resp.data!);
          this.resetForm();
          // ir a detail prduct
          this.onTab("pills-detail-tab");
          //this.onTab('');
          this.onMessage('Success','Save Successfully!','success','info');
        }else{
          this.onMessage('Error!','Error the save entity!','error','info');
        }
      }
    })
  }

  onTab(name:string){
    new FunctionCategory().onSelectTab(name);
  }

  onMessage(title:string, text:string, icon:SweetAlertIcon, confirm: string){
    new FunctionCategory().msgPage(title, text, icon, confirm)
  }
  resetForm(){
    this.productForm.reset();
  }

  onListTab(){
    this.onTab('pills-home-tab');
  }
  initForm(status: boolean){
    if(!status){

      return this.fb.group({
        name    : ['', Validators.required],
        color   : ['', Validators.required],
        category: [, Validators.required],
        size    : ['', Validators.required],
        price   : ['', Validators.required],
        stores  : [],
      });
    }else{
      let sto:number [] = []; 
      this.product.stores?.filter( x => {
          sto.push( x.id! )
      })
      
      return this.fb.group({
        name    : [this.product.name, Validators.required],
        color   : [this.product.color, Validators.required],
        category: [this.product.categoryId, Validators.required],
        size    : [this.product.size, Validators.required],
        price   : [this.product.price, Validators.required],
        stores  : [sto],
      })
    }
  }


}
