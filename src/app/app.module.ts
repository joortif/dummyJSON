import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './modules/product/product.component';
import { PaginationComponent } from './modules/pagination/pagination.component';
import { UserComponent } from './modules/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './modules/product-form/product-form.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { UserFormComponent } from './modules/user-form/user-form.component';
import { CartComponent } from './modules/cart/cart.component';
import { StartComponent } from './modules/start/start.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    PaginationComponent,
    ProductFormComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    UserFormComponent,
    CartComponent,
    StartComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
