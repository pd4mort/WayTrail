import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onLogin(email, password) {

    try {

      const user = await this.authSvc.login(email.value, password.value);

      if (user) {

        let isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);

      }

    } catch (error) {
      console.log('Error', error)
    }
  }

  async onLoginGoogle() {

    try {

      const user = await this.authSvc.loginGoogle();

      if (user) {
        let isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }

    } catch (error) {
      console.log('Error', error)
    }
  }

  //Si esta logueado, lo mandamos dentro si no, pagina de verificacion
  private redirectUser(isVerified: boolean) {

    if (isVerified) {

      this.router.navigate(['admin']);

    }
    else {
      this.router.navigate(['verify-email']);
    }
  }

}
