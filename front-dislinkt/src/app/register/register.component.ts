import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { DatePipe } from '@angular/common'
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  profile: Profile;
  datePipe = new DatePipe("en-US")
  constructor(
    private fb: FormBuilder,
    private route : Router,
    private regService : AuthenticationService,
    private profileService : ProfileService, 
    private snackBar: MatSnackBar,

  ) { }

  registrationPending = false;
  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern(new RegExp('\\S'))]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,
    Validators.pattern(new RegExp('\\S'))]),
    ime: new FormControl(''),
    prezime: new FormControl(''),
    telefon: new FormControl(''),
    datumRodjenja: new FormControl(''),
    pol: new FormControl(''),
    privacy: new FormControl('')

  });

  register(): void{
    if (this.registrationForm.invalid){
      return;
    }

    this.registrationPending = true;
    let email = this.registrationForm.controls['email'].value;
    let username = this.registrationForm.controls['username'].value;
    let password = this.registrationForm.controls['password'].value;
    let ime = this.registrationForm.controls['ime'].value;
    let prezime = this.registrationForm.controls['prezime'].value;
    let telefon = this.registrationForm.controls['telefon'].value;
    let datum = this.registrationForm.controls['datumRodjenja'].value;
    let datumRodjenja = this.datePipe.transform(datum, 'yyyy-MM-dd');

    let pol = this.registrationForm.controls['pol'].value;
    let privacy = this.registrationForm.controls['privacy'].value;
    let privat : boolean = true;

    if (privacy == "public"){
      privat = false;
    }


    this.user = {
      email: email, 
      username: username, 
      password: password,
      ime: ime,
      prezime: prezime,
      telefon: telefon,
      datumRodjenja: datumRodjenja,
      pol: pol
    };

    console.log(this.user);

    this.regService.signup(this.user).subscribe( 
      result => {
        console.log(result);

        if (result.code == "success") {

          this.profile = {
            user_id: result.user_id,
            private: privat
          }

          this.profileService.createProfile(this.profile).subscribe(
            result => {
              console.log(result);
              this.openSuccessSnackBar('Successfully created new account.');
            },

            (err:Error) =>{
              console.log(err);
              this.openFailSnackBar(err as unknown as string);
              this.registrationPending = false;
            }
          )
          this.route.navigate(['/index']);

        }
        else {
          this.openFailSnackBar(result.message);
          this.registrationPending = false;
        }
      },
      
      err =>{
        console.log(err);
        this.openFailSnackBar(err as unknown as string);
        this.registrationPending = false;
      }

    );

  }
  

  ngOnInit(): void {
  }
    

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
      duration: 4000,
    });
  }
  openFailSnackBar(message = 'Something went wrong.'): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['red-snackbar']
    });
  }

}
