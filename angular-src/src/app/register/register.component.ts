import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
model: any = {
  roles: [
    {name: 'SALES', value: 'SALES', checked: false},
    {name: 'ACCOUNTS', value: 'ACCOUNTS', checked: false},
    {name: 'ADMIN', value: 'ADMIN', checked: false}
  ]
};


  constructor(
    private validateService: UserService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {
     }

  register() {
    console.log(this.model);
    const newModel = {...this.model, roles: this.model.roles.filter(role => role.checked).map(role => role.value) };
    if (!this.validateService.validateRegister(this.model)) {
      this.flashMessage.show('Please fill in all the fields...', {cssClass: 'alert-danger', timout: 3000});
      return false;
    }

    this.authService.register(newModel)
    .subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Successfully Registered Now yo may login..', {cssClass: 'alert-success', timeout: 5000});
        return this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
      }
      // console.log(data);
    });
  }
}
