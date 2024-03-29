import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { AuthenticationService } from '../services/authentication.service';
import { PostService } from '../services/post.service';
import { CreatePostComponent } from './create-post/create-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router,
    public postService: PostService,
    public dialog: MatDialog,
    private authService: AuthenticationService
  ) { }

  guest: Boolean;

  ngOnInit(): void {

    let user = this.authService.getUser();
    console.log(user);
    if(!user){
      this.guest = true;
      console.log("neregistrovan korisnik");
    }
    else{
      this.guest = false;
      console.log("registrovan korisnik");
      console.log(user.profile_id)
      // window.location.reload();
    }
    this.router.navigate(['/posts']);
  }
  
  login(): void{
    this.router.navigate(['/login']);
  }

  register(): void{
    this.router.navigate(['/register']);
  }

  profile(): void {
    this.router.navigate(['/profile']);
  }

  requests(): void{
    this.router.navigate(['/requests']);
  }

  signOut(){
    this.authService.logout();
    // this.authService.deleteUser();
    window.location.reload();
  }
  
  dislinkt(){
    this.router.navigate(['/posts']);
  }

}
