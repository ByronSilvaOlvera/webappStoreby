import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal, { SweetAlertIcon }  from 'sweetalert2';
import { FunctionCategory } from '../function-category';
import { Subscription } from 'rxjs';
import { CategoryElement } from 'src/app/interfaces/category';


@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  category : CategoryElement =  {};
  mostarform:boolean = true;
  create:boolean  = true;
  title:boolean = true;


  categoryForm :FormGroup ;

  validacion:boolean = false;

  constructor(private fb: FormBuilder
              ,private router: Router
              ,private _srvcategory: CategoryService
              ,private spinner: NgxSpinnerService
              ) {
                this.categoryForm = this.initForm(true);
                this.spinner.show();
                this.subscription = this._srvcategory.getList().subscribe(
                  data => {    
                  
                    // UDPATE             
                    if(data.id! > 0){
                      this.category     = data.data!;
                      this.categoryForm = this.initForm(false);                      
                      this.mostarform   = !data.ok               
                      this.create       = data.ok!;
                      this.title        = data.ok!;
                    }
                    /// CREATE
                    else{
                      // show form
                      if(data.id == 0 && data.ok){

                        this.category     = {}
                        this.categoryForm = this.initForm(true);
                        this.mostarform   = data.ok!;
                        this.title        = true;
                        this.mostarform   = data.ok!;
                        this.create       = data.ok!;
                      }
                      else{
                        this.mostarform =  data.ok!;
                      }                      
                    }
                    this.spinner.hide();
                  })
               }

  ngOnInit(): void {
  }

  onSave(){
    if( this.categoryForm.invalid ){
      //console.log('Invalido', this.categoryForm.value, this.categoryForm.invalid);
      this.validacion = true;
    }else{
      this.validacion = false;
      //console.log('Valido', this.categoryForm.value);
      this.spinner.show();
      console.log(this.mostarform);
      
      //SAVE
      if(this.create){
        this.onSaveEntity();
      }
      else{
        this.onUpdateEntity();
      }
      //UPDATE
      this.spinner.hide();
      this.categoryForm.reset();
    }
  }

  onSaveEntity(){
    console.log('create');
    
    this._srvcategory.addCategory(this.categoryForm.value).subscribe(
      resp => {
        if(resp.ok){
          
          this._srvcategory.addFormSave( resp.data! );
          this.resetForm();
          this.msgPage('Success','Category Save Successfully', 'success' ,'Success');
          new FunctionCategory().onSelectTab('pills-detail-tab');
          this.category = {}
        }
        else{
          this.msgPage('Error','Do you want to continue','error','info');         
        }
      }
    )
  }

  onUpdateEntity(){
    console.log('update');
    this.spinner.show();    
    this._srvcategory.updateEntity(this.categoryForm.value, this.category.id! ).subscribe(
      resp =>{
        if(resp.ok){
          this._srvcategory.addUpdateSave(this.category.id!);
          this.resetForm();
          new FunctionCategory().onSelectTab('pills-detail-tab');
          this.spinner.hide();
          this.msgPage('Success','Category Update Successfully', 'success' ,'Success');
          this.category = {}
        }
        else{
          this.spinner.hide();
          this.msgPage('Success','Category Update Successfully','error','Success');
        }
      }
    )
  }

  resetForm(){
    this.categoryForm.reset();
  }

  onLists(){
    new FunctionCategory().onSelectTab('pills-home-tab');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /** Init form
   * true: form empty
   * false: form data update
   */
  initForm(status: boolean){
    if(status){

      return this.fb.group({
        name: ['', Validators.required],
        keywords: [ '', Validators.required],
      });
    }else{
      return this.fb.group({
        name: [this.category.name, Validators.required],
        keywords: [ this.category.keywords, Validators.required],
      })
    }
  }

  msgPage(title:string, text:string, icon:SweetAlertIcon, confirm: string){
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: confirm
    })
  }




}
