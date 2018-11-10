import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
model: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

    login() {
      this.authService.authenticateUser(this.model)
      .subscribe(data => {
        if (data.success) {
          this.authService.storeUser(data.token, data.user);

          this.flashMessage.show('You are succesfully Logged In..', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['dashboard']);
        } else {
          this.flashMessage.show('wrong Password', {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['login']);
        }
      });
    }
}
