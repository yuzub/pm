import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./user/auth.service";
import { MessageService } from "./messages/message.service";

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
  loading: boolean = true;

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private router: Router) {

    /*     router.events.subscribe((routerEvent: Event) => {
          this.checkRouterEvent(routerEvent);
        }); */
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
