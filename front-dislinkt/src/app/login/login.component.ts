import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthenticationService
  ) { }

  loginPending = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern(new RegExp('\\S'))]),
    password: new FormControl('', [Validators.required,
    Validators.pattern(new RegExp('\\S'))]),
    grant_type: new FormControl('password'),
    scope: new FormControl(''),
    client_id: new FormControl(''),
    client_secret: new FormControl('')
  });

  login(): void{
    if (this.loginForm.invalid){
      return;
    }
    this.loginPending = true;
    this.authService.login(this.loginForm);
    /** get currently logged user */
    this.authService.setLoggedUser();
    this.loginPending = false;
  } 

  ngOnInit(): void {
  }

}
