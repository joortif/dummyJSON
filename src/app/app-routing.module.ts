import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './modules/product/product.component';
import { ProductFormComponent } from './modules/product-form/product-form.component';
import { UserComponent } from './modules/user/user.component';
import { UserFormComponent } from './modules/user-form/user-form.component';
import { CartComponent } from './modules/cart/cart.component';
import { StartComponent } from './modules/start/start.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full'} ,
  { path: 'products', component: ProductComponent },
  { path: 'products/form', component : ProductFormComponent },
  { path: 'products/form/:id', component : ProductFormComponent },
  { path: 'users', component: UserComponent },
  { path: 'users/form', component: UserFormComponent },
  { path: 'users/form/:id', component: UserFormComponent },
  { path: 'carts/user/:id', component: CartComponent },
  { path: 'start', component: StartComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
