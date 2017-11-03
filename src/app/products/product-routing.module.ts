import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';

import {
  ProductDetailGuard
  // ProductEditGuard
} from './product-guard.service';
import { AuthGuard } from '../user/auth-guard.service';

import { ProductResolver } from './product-resolver.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
      { path: 'products/:id', canActivate: [ProductDetailGuard, AuthGuard], component: ProductDetailComponent, resolve: { product: ProductResolver } },
      {
        path: 'products/:id/edit',
        canActivate: [ProductDetailGuard, AuthGuard],
        component: ProductEditComponent,
        resolve: { product: ProductResolver },
        children: [
          {
            path: '', redirectTo: 'info', pathMatch: 'full'
          },
          {
            path: 'info', component: ProductEditInfoComponent
          },
          {
            path: 'tags', component: ProductEditTagsComponent
          }
        ]
      },
      // { path: 'productEdit/:id', canDeactivate: [ProductEditGuard], component: ProductEditComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
