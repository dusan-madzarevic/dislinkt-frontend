import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile!: Profile;
  user!: string;

  constructor(
    private authService : AuthenticationService,

  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log(this.user);
  }

}
