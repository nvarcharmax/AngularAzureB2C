import { Component } from '@angular/core';
import { MsalService } from './msal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularAzureB2C';

  constructor(
    private msalService: MsalService
  ){}

  login(): void {
      this.msalService.login();
  }
  
  logout(): void {
      this.msalService.logout();
      sessionStorage.clear();
  };

  isOnline(): boolean {
      return this.msalService.isOnline();
  };
  
}
