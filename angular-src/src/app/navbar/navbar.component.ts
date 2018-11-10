import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
// import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: any;
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) {
      this.token = localStorage.getItem('id_token');
      this.user = JSON.parse(localStorage.getItem('user'));
    }

  ngOnInit() {
    console.log(this.token);
  }

  logout() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
  }
}
