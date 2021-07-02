import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { StoreComponent } from './pages/store/store.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path : '' , component : HomeComponent, },
  {path : 'product' , component : ProductComponent},
  {path : 'store' , component : StoreComponent},
  {path : 'category' , component : CategoryComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
