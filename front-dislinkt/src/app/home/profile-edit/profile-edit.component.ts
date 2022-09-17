import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/image.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  userProfile!: Profile;
  user!: User;
  newUser!: User;
  newProfile!: Profile;
  datePipe = new DatePipe("en-US")
  
  constructor(
    private authService : AuthenticationService,
    private profileService : ProfileService,
    private route : Router,
    private snackBar: MatSnackBar,
  ) { }

  profileForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern(new RegExp('\\S'))]),
    username: new FormControl('', [Validators.required]),
    ime: new FormControl(''),
    prezime: new FormControl(''),
    telefon: new FormControl(''),
    datumRodjenja: new FormControl(''),
    pol: new FormControl(''),
    privacy: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.profileForm.patchValue({
      'email': this.user.email,
      'username': this.user.username,
      'ime': this.user.ime,
      'prezime': this.user.prezime,
      'telefon': this.user.telefon,
      'datumRodjenja': this.user.datumRodjenja,
      'pol': this.user.pol,
    })

    this.profileService.getProfile(this.user.profile_id).subscribe(
      response => {
        console.log(response);
        this.userProfile = response;
        var privacy = "public";
        if (this.userProfile.private) privacy = "private";
        this.profileForm.patchValue({
          'privacy': privacy,
          'description': this.userProfile.description
        })
      },
      err => {
        console.log(err);
      }
    )

  }

  save(){
    let email = this.profileForm.controls['email'].value;
    let username = this.profileForm.controls['username'].value;
    let ime = this.profileForm.controls['ime'].value;
    let prezime = this.profileForm.controls['prezime'].value;
    let description = this.profileForm.controls['description'].value;
    let telefon = this.profileForm.controls['telefon'].value;
    let datum = this.profileForm.controls['datumRodjenja'].value;
    let datumRodjenja = this.datePipe.transform(datum, 'yyyy-MM-dd');

    let pol = this.profileForm.controls['pol'].value;
    let privacy = this.profileForm.controls['privacy'].value;
    let privat : boolean = true;

    if (privacy == "public"){
      privat = false;
    }


    this.newUser = {
      id: this.user.id,
      profile_id: this.userProfile.id,
      email: email, 
      username: username, 
      password: this.user.password,
      ime: ime,
      prezime: prezime,
      telefon: telefon,
      datumRodjenja: datumRodjenja,
      pol: pol
    };

    console.log(this.newUser);

    this.authService.editUser(this.newUser).subscribe(
      result => {
        console.log(result);
        if (result.code == "success") {

          // this.authService.setLoggedUser();
          localStorage.setItem('user', JSON.stringify(this.newUser));

          this.newProfile = {
            id: this.userProfile.id,
            user_id: String(this.user.id),
            private: privat,
            description: description,
          }

          this.profileService.editProfile(this.newProfile).subscribe(
            result => {
              console.log(result);
              this.openSuccessSnackBar('Successfully updated.');
            },

            (err:Error) =>{
              console.log(err);
              this.openFailSnackBar(err as unknown as string);
            }
          )
          this.route.navigate(['/profile']);

        }
        else {
          this.openFailSnackBar(result.message);
        }
        // this.route.navigate(['/profile']);
      },
      err => {
        console.log(err);
      }
    )



  }

  cancel() {
    this.route.navigate(['/profile']);
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
