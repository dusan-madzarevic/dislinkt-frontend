import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SNACKBAR_CLOSE, SNACKBAR_ERROR_OPTIONS } from '../constants/snackbar';
import { Token } from '../models/token';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  loginPending = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required,
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
    let formData: any = new FormData();
      Object.keys(this.loginForm.controls).forEach(formControlName => {
      formData.append(formControlName, this.loginForm.get(formControlName).value);
    });
    this.authService.login(formData).subscribe(
      (token: Token) => {
        if(token){
          /** get currently logged user */
          this.authService.setSession(token);
          this.authService.setLoggedUser();
          this.loginPending = false;
          this.router.navigate(['/']);
        }
        else{
          this.loginPending = false;
          this.snackBar.open("Pogresni email ili lozinka!", SNACKBAR_CLOSE, SNACKBAR_ERROR_OPTIONS);
        }
    });
  } 

  ngOnInit(): void {
  }

}
