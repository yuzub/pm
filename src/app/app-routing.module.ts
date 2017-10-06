import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerComponent } from './customers/customer.component';
import { CustomerRfComponent } from './customers/customer-rf.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'customer-rf', component: CustomerRfComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
