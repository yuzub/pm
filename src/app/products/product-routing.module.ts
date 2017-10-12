import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent },
      { 
        path: 'productEdit/:id', 
        canDeactivate: [ProductEditGuard], 
        component: ProductEditComponent 
      }
    ])
  ],
  exports: [ RouterModule ]
})
export class ProductRoutingModule { }
