import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from '../models/post';
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
    public dialog: MatDialog
  ) { }

  guest: Boolean;
  posts: Post[];
  searchPending = false;
  searchForm: FormGroup = new FormGroup({
    profile: new FormControl('', [Validators.pattern(new RegExp('\\S'))])
  });

  ngOnInit(): void {
    this.guest = true;
    this.getPosts();
  }
  
  login(): void{
    this.router.navigate(['/login']);
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
  
}
