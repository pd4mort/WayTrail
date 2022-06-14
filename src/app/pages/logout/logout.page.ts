import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { AuthService } from 'src/app/service/auth.service';


export class logoutPage implements OnInit {

  constructor(
    private authSvc: AuthService, 
    private router: Router,  
  ) { }

  ngOnInit() {

    this.authSvc.logout();
    //this.router.navigate(['home']);
  }

}
