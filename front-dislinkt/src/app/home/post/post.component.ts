import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_CLOSE, SNACKBAR_ERROR_OPTIONS } from 'src/app/constants/snackbar';
import { CommentCreate } from 'src/app/models/comentcreate';
import { Post } from 'src/app/models/post';
import { Reaction } from 'src/app/models/reaction';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentService } from 'src/app/services/comment.service';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //testComment

  constructor(
    public commentService: CommentService,
    public reactionService: ReactionService,
    public authService: AuthenticationService,
    public snackBar: MatSnackBar
  ) { }

  @Input() post: Post;
  guest: boolean = true;
  user: User = null;
  comments: Comment[] = [];
  displayComments: string = "none";
  reactions: Reaction[] = [];
  disableReactions: boolean = false;
  likeColor = "primary";
  dislikeColor = "primary";
  commentText: string;

  ngOnInit(): void {
    let user = this.authService.getUser();
    if(!user){
      this.guest = true;
      console.log("neregistrovan korisnik")
    }
    else{
      this.guest = false;
      this.user = user;
      console.log("registrovan korisnik");
    }
    this.fetchComments();
    this.fetchReactions();
    if(this.post == null){
      return;
    }
    this.post.text = this.linkify(this.post.text);
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
        (comments: any) => {
          this.comments = comments;
      });
    }
  }


  linkify(inputText: string) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;
    if (inputText.includes("<a href")){
      return inputText;
    }
    if (inputText.indexOf("<a ")) {
      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<div contentEditable="false" style="display: inline-block; padding: 5px;"><a href="$1" target="_blank">$1</a></div>');
  
      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<div contentEditable="false" style="display: inline-block; padding: 5px;"><a href="http://$2" target="_blank">$2</a></div>');
  
      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(replacePattern3, '<div contentEditable="false" style="display: inline-block; padding: 5px;"><a href="mailto:$1">$1</a></div>');
    } else {
      replacedText = inputText;
    }
    console.log(replacedText);
    return replacedText;
  }

  fetchReactions(): void{
    if(this.post == null){
      return;
    }
    this.reactionService.fetchReactionsForPost(this.post.id).subscribe(
      (reactions: Reaction[]) => {
      this.reactions = reactions;
      if (!this.guest){
        let reaction: Reaction = this.reactionService.checkUserInReactions(this.user.id, reactions);
        if (reaction != null){
          this.disableReactions = true;
          if (reaction.like){
            this.likeColor = "red";
          }
          else{
            this.dislikeColor = "red";
          }
        }
      }
    });
  }

  like(): void{
    if (this.guest){
      this.snackBar.open("You need to sign in!", SNACKBAR_CLOSE, SNACKBAR_ERROR_OPTIONS);
      return;
    }
    if (this.disableReactions){
      this.snackBar.open("Already reacted, can't change now!", SNACKBAR_CLOSE, SNACKBAR_ERROR_OPTIONS);
      return;
    }
    let user = this.authService.getUser();
    const reaction = {} as Reaction;
    reaction.id = 1;
    reaction.user_id = user.id;
    reaction.post_id = this.post.id;
    reaction.like = true;
    this.reactionService.addReaction(reaction).subscribe();
    this.likeColor = "red";
    this.disableReactions = true;
  }

  dislike(): void{
    if (this.guest){
      this.snackBar.open("You need to sign in!", SNACKBAR_CLOSE, SNACKBAR_ERROR_OPTIONS);
      return;
    }
    if (this.disableReactions){
      this.snackBar.open("Already reacted, can't change now!", SNACKBAR_CLOSE, SNACKBAR_ERROR_OPTIONS);
      return;
    }
    let user = this.authService.getUser();
    const reaction = {} as Reaction;
    reaction.id = 1;
    reaction.user_id = user.id; 
    reaction.post_id = this.post.id;
    reaction.like = false;
    this.reactionService.addReaction(reaction).subscribe();
    this.dislikeColor = "red";
    this.disableReactions = true;
  }

  comment(): void{
    let user = this.authService.getUser();
    const comment = {} as CommentCreate;
    comment.id = 1;
    comment.user_id = user.id; 
    comment.post_id = this.post.id;
    comment.text = this.commentText;
    this.commentService.addComment(comment).subscribe();
  }

}
