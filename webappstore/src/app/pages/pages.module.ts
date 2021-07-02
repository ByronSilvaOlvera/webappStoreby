import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { ProductComponent } from './product/product.component';
import { StoreComponent } from './store/store.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CategoryComponent } from './category/category.component';
import { FormCategoryComponent } from './category/form-category/form-category.component';
import { DetailCategoryComponent } from './category/detail-category/detail-category.component';
import { GridCategoryComponent } from './category/grid-category/grid-category.component';
import { GridProductComponent } from './product/grid-product/grid-product.component';
import { FormComponent } from './product/form/form.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { DetailStoreComponent } from './store/detail-store/detail-store.component';
import { GridStoreComponent } from './store/grid-store/grid-store.component';
import { FormStoreComponent } from './store/form-store/form-store.component';
import { ToastrModule } from 'ngx-toastr';
import { ConsultProductComponent } from './product/consult-product/consult-product.component';

import { NgSelectModule } from "@ng-select/ng-select";
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    ProductComponent,
    StoreComponent,
    CategoryComponent,
    FormCategoryComponent,
    DetailCategoryComponent,
    GridCategoryComponent,
    GridProductComponent,
    FormComponent,
    DetailProductComponent,
    DetailStoreComponent,
    GridStoreComponent,
    FormStoreComponent,
    ConsultProductComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    ComponentsModule
  ],
  exports :[
    ProductComponent,
    StoreComponent,
    CategoryComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class PagesModule { }
