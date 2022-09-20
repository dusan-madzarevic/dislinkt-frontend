import { Component, OnInit } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.css']
})
export class Profile2Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    public authService: AuthenticationService,
    public postService: PostService,
    public followService: FollowService
  ) { }

  id: number;
  name: string;
  surname: string;
  guest: boolean;
  loged_id: number;
  state: string = ""
  posts: Post[] = [];

  ngOnInit(): void {
    let user = this.authService.getUser();
    if(!user){
      this.guest = true;
    }
    else{
      this.guest = false;
      this.loged_id = user.profile_id;
      if (this.loged_id == this.id){
        this.guest = true;
      }
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      console.log(this.id);
      this.userService.get_User_id(this.id).subscribe(
        (res: any) => {
          console.log(res);
          this.name = res.name;
          this.surname = res.surname;
        }
      );
      this.postService.fetchUserPosts(this.id).subscribe(
        (res: Post[]) => {
          console.log(res);
          this.posts = res;
        }
      );
      if(!this.guest){
        this.followService.checkFollow(this.loged_id, this.id).subscribe(
          (res: any) => {
            console.log(res);
            if(res.follower_id != 0){
              if(!res.accepted){
                this.state = "Request sent"
              }
              else{
                this.state = "Unfollow"
              }
            }
            else{
              this.state = "Follow"
            }
          }
        );
      }

    })
  }

  follow(): void{
    if(this.state == "Request sent"){
      return
    }
    else if(this.state == "Follow"){
      this.followService.follow(this.loged_id, this.id).subscribe(
        (res: any) => {
          console.log(res);
          this.ngOnInit();
        }
      );
      
    }
    else{
      this.followService.follow(this.loged_id, this.id).subscribe(
        (res: any) => {
          console.log(res);
          this.ngOnInit();
        }
      );
    }
  }

}
