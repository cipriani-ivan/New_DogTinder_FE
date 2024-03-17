import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIClient } from 'output';
import { User } from './user';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ad-login',
  templateUrl: './login.component.html', 
})
export class LoginComponent {
  form:FormGroup;

  somethingWentWrong = false;

  constructor(private fb:FormBuilder, 
               private api: APIClient,
               private router: Router) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  login() {
      const val = this.form.value;

      if (val.email && val.password) {
        var userPre: User = { password:val.password, username: val.email }
        const user = JSON.stringify(userPre);
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        this.api.postLogin(user, { headers: headers }).subscribe((token) => {
          localStorage.setItem('token',token.jwt)
          this.router.navigateByUrl('/appointments');
        });
      }
  }
}