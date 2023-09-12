import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './modules/product/product.component';
import { ProductDetailComponent } from './modules/product-detail/product-detail.component';
import { ProductFormComponent } from './modules/product-form/product-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full'} ,
  { path: 'products', component: ProductComponent },
  { path: 'products/detail/:id', component: ProductDetailComponent }, 
  { path: 'products/form', component : ProductFormComponent },
  { path: 'products/form/:id', component : ProductFormComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
