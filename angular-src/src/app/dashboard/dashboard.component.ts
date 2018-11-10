import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  sales() {
    this.authService.sales()
    .subscribe(res => {
      console.log(res);
      if (res.success) {
        this.flashMessage.show(res.msg, {cssClass: 'alert-success', timeout: 3000});
      }
       this.router.navigate(['/dashboard/sales']);
    });
  }

  accounts() {
    this.authService.accounts()
    .subscribe(res => {
      console.log(res);
      if (res.success) {
        this.flashMessage.show(res.msg, {cssClass: 'alert-success', timeout: 3000});
      }
      this.router.navigate(['/dashboard/accounts']);
    });
  }

}
