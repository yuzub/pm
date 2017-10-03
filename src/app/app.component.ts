import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `
  <div>
    <h1>{{pageTitle}}</h1>
    <!-- <h1 innerText={{pageTitle}}></h1> --> <!-- the same result as on line 7 -->
    <div>My First Component</div>
    <pm-products></pm-products>
  </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}

/* import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular: Getting Started';
}
 */