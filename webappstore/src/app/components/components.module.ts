import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ListTbComponent } from './list-tb/list-tb.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderContentComponent } from './header-content/header-content.component';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    NavbarComponent,
    ListTbComponent,
    PageNotFoundComponent,
    HeaderContentComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
  ],
  exports : [
    NavbarComponent,
    ListTbComponent,
    HeaderContentComponent
  ]
})
export class ComponentsModule { }
