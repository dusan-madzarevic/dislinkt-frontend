import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/image.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile!: Profile;
  user!: User;
  profilePicture: any;

  constructor(
    private authService : AuthenticationService,
    private profileService : ProfileService,
    private imageService : ImageService,
    private route : Router,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log(this.user);
    console.log(this.authService.getToken());

    this.profileService.getProfile(this.user.profile_id).subscribe(
      response => {
        console.log(response);
        this.userProfile = response;
        this.imageService.getImage(this.userProfile.picture).subscribe(
          (blob: Blob) => {
            var objectURL = URL.createObjectURL(blob);
            console.log(objectURL);
            this.profilePicture = objectURL;
        });
      },
      err => {
        console.log(err);
      }
    )

  }


  editProfile(){
    this.route.navigate(['/profile/edit']);

  }

}
