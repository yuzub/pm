import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
// import { InMemoryDataService }  from './in-memory-data.service';

import { SharedModule } from './../shared/shared.module';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';

import {
  ProductDetailGuard
  // ProductEditGuard
} from './product-guard.service';

import { ProductService } from './product.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData),
    ProductRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ConvertToSpacesPipe
  ],
  providers: [
    ProductService,
    ProductDetailGuard
    // ProductEditGuard
  ]
})
export class ProductModule { }
