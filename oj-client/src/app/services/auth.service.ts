// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as auth0 from 'auth0-js';

// Avoid name not found warnings
//let Auth0Lock = require('auth0-lock').default;
@Injectable()
export class AuthService {


  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: '_R4CuB_iAF8Euc0rso6MQyvO7k1IBGCD',
    domain: 'cojproject.auth0.com',
    responseType: 'token id_token',
    audience: 'https://cojproject.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid'
  });


  constructor(public router: Router) {

  }

  public login(): void {
    // this.auth0.authorize();
    this.auth0.authorize();
    //console.log(localStorage.getItem('profile'));

  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;

  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        console.log(self.userProfile);
      }
      cb(err, profile);
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/problems']);
      } else if (err) {
        this.router.navigate(['/problems']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  // public resetPassword(): void {
  //   let profile = this.getProfile();
  //   let url: string = `https://${this.domain}/dbconnections/change_password`;
  //   let headers = new Headers({ 'content-type': 'application/json' });
  //   let body = {
  //     client_iD: this.clientID,
  //     email: profile.email,
  //     connection: 'Username-Password-Authentication'
  //   }
  //
  //   this.http.post(url, body, headers)
  //     .toPromise()
  //     .then((res: Response) => {
  //       console.log(res.json());
  //     })
  //     .catch(this.handleError);
  //
  //
  // }
  // private handleError(error: any): Promise<any> {
  //   console.error('Error occurred', error);
  //   return Promise.reject(error.message || error);
  // }

}
