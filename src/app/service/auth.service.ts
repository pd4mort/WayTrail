import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, signOut } from 'firebase/auth';
import * as auth from 'firebase/auth';
import { User } from '../shared/user.interface';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Observable, of } from 'rxjs';
import { switchMap } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Observable usuario user
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

  }

  //Metodo registro usuario
  async register(email: string, password: string): Promise<User> {

    try {
      
      const {user} = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;

    } catch (error) {
      console.log('Error', error)
    }

  }

  //Metodo email confirmacion de registro
  async sendVerificationEmail(): Promise<void> {

    try {

      return (await this.afAuth.currentUser).sendEmailVerification();
      
    } catch (error) {
      console.log('Error', error)
    }
  }

  //Metodo verificacion email
  isEmailVerified(user: User): boolean {

    return user.emailVerified === true ? true: false;

  }

  //Metodo resetea Password
  async resetPassword(email: string): Promise<void> {

    try {
      
      return this.afAuth.sendPasswordResetEmail(email);

    } catch (error) {
      console.log('Error', error)
    }
  }

  async loginGoogle(): Promise<User> {

    try {
      
      const {user} = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;

    } catch (error) {
      console.log('Error', error)
    }

  }

  //Metodo login
  async login(email: string, password: string): Promise<User> {

    try {

      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;

    } catch (error) {
      console.log('Error', error)
    }
  }

  //Metodo logout (salir)
  async logout(): Promise<void> {

    try {

      await this.afAuth.signOut();

    } catch (error) {
      console.log('Error', error)
    }

  }

  //Metodo usuario
  private updateUserData(user: User){

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, {merge:true});

  }
}
