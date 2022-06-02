import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage {

  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router) { }


  async onSendEmail(): Promise<void> {

    try {
      await this.authSvc.sendVerificationEmail();
      
    } catch (error) {
      console.log('Error', error);
    }
    this.router.navigate(['login']);
  }

  ngOnDestroy(){

    this.authSvc.logout();

  }
}
