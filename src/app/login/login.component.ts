import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {LoginRequest} from '../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = {} as FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  test(): void {
    this.login({
      username: 'admin@test.caseware.com',
      password: 'Stage!@#'
    });
  }

  submit(): void {
    console.log(this.loginForm.value);
    this.authService.authenticate(this.loginForm.value);
  }

  login(request: LoginRequest): void {
    this.authService.authenticate(request);
  }

}
