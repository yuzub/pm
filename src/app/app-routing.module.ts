import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerComponent } from './customers/customer.component';
import { CustomerRfComponent } from './customers/customer-rf.component';

const ROUTES = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer-rf', component: CustomerRfComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES
    // , { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
