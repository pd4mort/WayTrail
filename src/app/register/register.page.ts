import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onRegister(email, passowrd) {

    try {

      const user = await this.authSvc.register(email.value, passowrd.value);

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
