import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { PasswordChange } from 'src/app/models/password-change';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { Skill } from 'src/app/models/skill';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/image.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

export interface EducationDialogData {
  school: string;
  degree: string;
  start: string;
  end: string;
  profile_id: string
}

export interface SkillDialogData {
  skillname: string;
  profile_id: string
}

export interface PasswordDialogData {
  oldPassword: string;
  newPassword: string;
  user_id: string
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
  educationList: Education[] = [];
  skillList: Skill[] = [];
  posts: Post[] = [];

  constructor(
    private authService : AuthenticationService,
    private profileService : ProfileService,
    private imageService : ImageService,
    private route : Router,
    public dialog: MatDialog,
    public postService: PostService,

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

          this.postService.fetchUserPosts(this.userProfile.id).subscribe(
            (res: Post[]) => {
              console.log(res);
              this.posts = res;
            }
          );

          this.profileService.getEducation(this.userProfile.id).subscribe(
            result => {
              console.log(result);
              result.forEach((element : Education) => {
                console.log(element);
                this.educationList.push(element);
              });
            },
            err => {
              console.log(err);
            }
          );

          this.profileService.getSkills(this.userProfile.id).subscribe(
            result => {
              console.log(result);
              result.forEach((element : Skill) => {
                console.log(element);
                this.skillList.push(element);
              });
            },
            err => {
              console.log(err);
            }
          )


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

  editProfile() {
    this.route.navigate(['/profile/edit']);
  }

  changePassword() {
    const dialogRef = this.dialog.open(PasswordDialog, {
      width: '300px',
      data: {user_id: this.user.id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteEducation(id: string){
    console.log(id);
    this.profileService.deleteEducation(id).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    )
    window.location.reload();
  }


  deleteSkill(id: string){
    console.log(id);
    this.profileService.deleteSkill(id).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    )
    window.location.reload();
  }


  openEducationDialog(): void {
    const dialogRef = this.dialog.open(EducationDialog, {
      width: '300px',
      data: {profile_id: this.userProfile.id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSkillDialog(): void {
    const dialogRef = this.dialog.open(SkillDialog, {
      width: '300px',
      data: {profile_id: this.userProfile.id},
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
  education: Education;
  datePipe = new DatePipe("en-US")
  constructor(
    public dialogRef: MatDialogRef<EducationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EducationDialogData,
    private profileService : ProfileService,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  addEducation() {
    let startdate = this.data.start;
    let start = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let enddate = this.data.end;
    let end = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    console.log(end);
    console.log(this.data.profile_id);
    this.education = {
      school: this.data.school,
      degree: this.data.degree,
      start: start,
      end: end,
      profile_id: this.data.profile_id
    }
    this.profileService.addEducation(this.education).subscribe(
      result => {
        console.log(result);
        if(result.code == "success") {
          this.dialogRef.close();
          window.location.reload();
        }
      },
      err => {
        console.log(err);
      }
    )

  }
}



@Component({
  selector: 'skill-dialog',
  templateUrl: 'skill-dialog.html',
})
export class SkillDialog {
  skill: Skill;
  constructor(
    public dialogRef: MatDialogRef<SkillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SkillDialogData,
    private profileService : ProfileService,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  addSkill() {
    this.skill = {
      skillname: this.data.skillname,
      profile_id: this.data.profile_id
    }
    this.profileService.addSkill(this.skill).subscribe(
      result => {
        console.log(result);
        if(result.code == "success") {
          this.dialogRef.close();
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}

@Component({
  selector: 'password-dialog',
  templateUrl: 'password-dialog.html',
})
export class PasswordDialog {
  password: PasswordChange;
  constructor(
    public dialogRef: MatDialogRef<SkillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordDialogData,
    private profileService : ProfileService,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    this.password = {
      user_id: this.data.user_id,
      old: this.data.oldPassword,
      new: this.data.newPassword
    }
    this.profileService.changePassword(this.password).subscribe(
      result => {
        console.log(result);
        if(result.code == "success") {
          this.dialogRef.close();
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}