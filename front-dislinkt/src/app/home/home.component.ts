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
  posts: Post[];
  searchPending = false;
  searchForm: FormGroup = new FormGroup({
    profile: new FormControl('', [Validators.pattern(new RegExp('\\S'))])
  });

  ngOnInit(): void {

    let user = this.authService.getUser();
    if(!user){
      this.guest = true;
      console.log("neregistrovan korisnik");
    }
    else{
      this.guest = false;
      console.log("registrovan korisnik");
      console.log(user.profile_id)
    }
  }
  
  login(): void{
    this.router.navigate(['/login']);
  }

  register(): void{
    this.router.navigate(['/register']);
  }

  newPost(): void{
    this.dialog.open(CreatePostComponent);
  }

  getPosts(): void{
    this.postService.fetchPosts().subscribe(
      (posts: Post[]) => {
      this.posts = posts;
    });
  }

  profile(): void {
    this.router.navigate(['/profile']);
  }
  
}
