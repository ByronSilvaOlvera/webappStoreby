import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FunctionCategory } from '../../category/function-category';
import { Store } from '../../../interfaces/store';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-form-store',
  templateUrl: './form-store.component.html',
  styleUrls: ['./form-store.component.scss']
})
export class FormStoreComponent implements OnInit {

  subscription: Subscription;
  id : number = 0;
  msgValidation:boolean=false;
  mostrarForm:boolean=true;
  mostrarMsg:boolean=false;
  storeForm :FormGroup ;
  store : Store ;
  update :boolean = false;
  
  constructor(private fb: FormBuilder
    ,private _svrStore : StoreService) { 
    this.storeForm = this.initForm (false);
    this.store = {};
    this.subscription = this._svrStore.getList().subscribe(
      data => {
                 
        //UPDATE
        if(data.id! > 0){
          this.store = data.data!;
          //console.log(this.product);
          
          this.id = data.id!;
          //mostrar el formulario
          this.mostrarForm = true;
          this.update = true;
          this.mostrarMsg= false;
          this.storeForm = this.initForm(true);
        }
        // CREATE
        else{
          //mostrar formulario
          if(data.id == 0 && data.ok){
            console.log('create');
            
            this.mostrarForm = true;
            this.update = false;
            this.mostrarMsg= false;
            this.storeForm = this.initForm(false);
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

  }

  onSubmit(){
    if(this.storeForm.invalid){
      // validacion
    }else{
      if(this.update){
        this.onUpdate();
      }else{
        this.onSave();
      }
    }
  }

  resetForm(){
    this.storeForm.reset();
  }

  onListTab(){
    this.onTab('pills-home-tab');
  }

  onTab(name:string){
    new FunctionCategory().onSelectTab(name);
  }

  onUpdate(){
    this._svrStore.updateEntity(this.storeForm.value, this.id )
    .subscribe( data => {
      if(data.ok){
        this._svrStore.addUpdate(this.id);
        this.onTab("pills-detail-tab");
        this.onMessage('Sucess','Update Successfully!','success','info');
      }else{
        this.onMessage('Error!','Update errors','error','info');

      }
    })  
  }
  onSave(){
    this._svrStore.addEntity(this.storeForm.value)
    .subscribe( resp => {
      if(resp.ok){
        this._svrStore.addSave(resp.store?.id!,resp.store!);
        this.resetForm();
        // ir a detail prduct
        this.onTab("pills-detail-tab");
        //this.onTab('');
        this.onMessage('Success','Save Successfully!','success','info');
      }
      else{
        this.onMessage('Error!','Error the save entity!','error','info');
      }
    })
  }

  onMessage(title:string, text:string, icon:SweetAlertIcon, confirm: string){
    new FunctionCategory().msgPage(title, text, icon, confirm)
  }

  initForm(status: boolean){
    if(!status){

      return this.fb.group({
        name   : ['', Validators.required],
        street : ['', Validators.required],
        number : ['', Validators.required],
        zipcode: ['', Validators.required],
        city   : ['', Validators.required],
        country: ['', Validators.required],
      });
    }else{
      return this.fb.group({
        name    : [this.store.name, Validators.required],
        street  : [this.store.street, Validators.required],
        number  : [this.store.number, Validators.required],
        zipcode : [this.store.zipcode, Validators.required],
        city    : [this.store.city, Validators.required],
        country : [this.store.country, Validators.required],
      })
    }
  }

}
