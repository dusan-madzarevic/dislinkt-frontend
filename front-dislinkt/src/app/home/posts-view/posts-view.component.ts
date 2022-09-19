import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.css']
})
export class PostsViewComponent implements OnInit {

  constructor(
    public router: Router,
    public postService: PostService,
    public authService: AuthenticationService,
    public userService: UserService,
    public dialog: MatDialog
  ) { }

  guest: Boolean;
  posts: Post[];
  search = false;
  searchPending = false;
  searchForm: FormGroup = new FormGroup({
    profile: new FormControl('', [Validators.pattern(new RegExp('\\S'))])
  });
  foundUsers: User[] = [];

  ngOnInit(): void {
    let user = this.authService.getUser();
    if(!user){
      this.guest = true;
      console.log("neregistrovan korisnik");
      this.getAllPosts();
    }
    else{
      this.guest = false;
      console.log("registrovan korisnik");
      console.log(user.profile_id)
      this.getFollowerPosts(user.profile_id);
    }
  }

  newPost(): void{
    this.dialog.open(CreatePostComponent).afterClosed().subscribe(
      result => {
      console.log(result);
      this.ngOnInit();
    });
    ;
  }

  getAllPosts(): void{
    this.postService.fetchPosts().subscribe(
      (posts: Post[]) => {
      this.posts = posts;
    });
  }

  getUserPosts(user_id: number): void{
    this.postService.fetchUserPosts(user_id).subscribe(
      (posts: Post[]) => {
      this.posts = posts;
    });
  }

  getFollowerPosts(profile_id: number): void{
    this.postService.fetchFollowerPosts(profile_id).subscribe(
      (posts: Post[]) => {
      this.posts = posts;
    });
  }

  searchUsers(){
  }

  notSearch(){
    this.search = false;
  }
}
