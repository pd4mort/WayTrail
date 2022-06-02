import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Control del Formulario Login
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';


  error_msg = {
    'email': [
      {
        type: 'required',
        message: 'Correo electrónico requerido.'
      },
      {
        type: 'pattern',
        message: 'Correo electrónico no válido.'
      }
    ],
    'password': [
      {
        type: 'required',
        message: 'Contraseña requerida.'
      },
      {
        type: 'minlength',
        message: 'Contraseña inferior a 6 dígitos.'
      }
    ]
  };

  constructor(
    private authSvc: AuthService, 
    private router: Router,  
    private fb: FormBuilder
    ) { }

    ngOnInit() {

      //Validaciones correo y contraseña
      this.userForm = this.fb.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])),
      });
    }

  async onLogin(values) {

    try {

      const user = await this.authSvc.login(values.value.email, values.value.password);

      if (user) {

        let isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);

      }

    } catch (error) {
      console.log('Error', error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      });
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
