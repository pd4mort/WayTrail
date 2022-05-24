import { Component, OnInit } from '@angular/core';
import { async } from '@firebase/util';
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

  constructor(private authSvc: AuthService) { }


  async onSendEmail(): Promise<void> {

    try {
      await this.authSvc.sendVerificationEmail();
    } catch (error) {
      console.log('Error', error);
    }
  }

  ngOnDestroy(){

    this.authSvc.logout();

  }
}
