import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crossbrowerstesting';

  constructor(public authService: AuthService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    if (this.cookieService.get('loggedIn') === 'true') {
      this.authService.cookieLogin();
    }
  }

}
