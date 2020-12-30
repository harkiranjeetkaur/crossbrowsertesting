import {Injectable} from '@angular/core';
import {LoginRequest} from '../models/user';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  private validUser: LoginRequest = {
    username: 'admin@test.caseware.com',
    password: 'Stage!@#'
  };

  constructor(private router: Router, private cookieService: CookieService) {
  }

  /**
   * Mock authentication - checks if credentials match hard-coded values.
   *
   * @param request LoginRequest.
   */
  authenticate(request: LoginRequest): void {
    if (request.username === this.validUser.username && request.password === this.validUser.password) {
      this.loggedIn = true;
      this.cookieService.set('loggedIn', 'true', new Date(Date.now() + 1000 * 60 * 60));
      this.router.navigateByUrl('/item/1').then();
    }
  }

  /**
   * Logs in if the user has a cookie.
   */
  cookieLogin(): void {
    this.authenticate(this.validUser);
  }

  /**
   * Logs out and removes cookie.
   */
  logout(): void {
    this.loggedIn = false;
    this.cookieService.deleteAll();
  }
}
