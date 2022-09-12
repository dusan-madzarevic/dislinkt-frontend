import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    public commentService: CommentService
  ) { }

  @Input() post: Post;
  comments: Comment[] = [];
  displayComments: string = "none";

  ngOnInit(): void {
    this.fetchComments();
  }
  
  toggle(): void{
    if (this.displayComments === "none") {
      this.displayComments  = "block";
    } else {
      this.displayComments  = "none";
    }
  }

  fetchComments(): void{
    if(this.post != null){
      this.commentService.fetchCommentsForPost(this.post.id).subscribe(
        (comments: Comment[]) => {
        this.comments = comments;
      });
  }
  }

}
