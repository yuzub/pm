import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from "./products/product-list.component";
import { StarComponent } from "./shared/star.component";
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';

import { ProductService } from "./products/product.service";
import { ProductGuardService } from './products/product-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent,
    ConvertToSpacesPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', canActivate: [ ProductGuardService ], component: ProductDetailComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [ProductService, ProductGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
