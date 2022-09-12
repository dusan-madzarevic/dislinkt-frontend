import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(
    private fb: FormBuilder,
    private route : Router,
    private regService : AuthenticationService,
    public datepipe: DatePipe
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
    let datumRodjenja = this.datepipe.transform(datum, 'yyyy-MM-dd');

    let pol = this.registrationForm.controls['pol'].value;

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
        this.route.navigate(['/index']);
      },
      
      (err:Error) =>{
        if(err.toString()==='Not created'){
          console.log(err);
        }
      }
    );


  }
  

  ngOnInit(): void {
  }



  // register(){
  //   this.user = new UserReg();
  //   this.user.email = this.registrationForm.controls['email'].value;
  //   this.user.username = this.registrationForm.controls['username'].value;
  //   this.user.password = this.registrationForm.controls['password'].value;
  //   //this.user = this.registrationForm.value;
  //   console.log(this.user);
  //   this.regService.signup(this.user).subscribe( 
  //     result => {
  //       this.route.navigate(['/register-email-confirm']);
  //     },
      
  //     (err:Error) =>{
  //       console.log("JJFJFFJJ");
  //       if(err.toString()==='Not created'){
  //         this.wrong = true;
  //         console.log(err);
  //       }
  //     });
    


}
