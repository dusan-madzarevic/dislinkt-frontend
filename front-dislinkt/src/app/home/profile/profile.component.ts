import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/image.service';
import { ProfileService } from 'src/app/services/profile.service';

export interface EducationDialogData {
  education: string
}

export interface SkillDialogData {
  skillList: []
}

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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log(this.user);
    console.log(this.authService.getToken());

    if(this.user != null) {
      this.profileService.getProfile(this.user.profile_id).subscribe(
        response => {
          console.log(response);
          this.userProfile = response;
          this.imageService.getImage(this.userProfile.picture).subscribe(
            (blob: Blob) => {
              let objectURL = URL.createObjectURL(blob);
              console.log(objectURL);
              this.profilePicture = objectURL;
          });
        },
        err => {
          console.log(err);
        }
      )
    }
    

  }


  editProfile(){
    this.route.navigate(['/profile/edit']);

  }


  openEducationDialog(): void {
    const dialogRef = this.dialog.open(EducationDialog, {
      width: '300px',
      data: {educationList: []},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


@Component({
  selector: 'education-dialog',
  templateUrl: 'education-dialog.html',
})
export class EducationDialog {
  constructor(
    public dialogRef: MatDialogRef<EducationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EducationDialogData,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  addEducation() {
    console.log(this.data.education);
  }
}