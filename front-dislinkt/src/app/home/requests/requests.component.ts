import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RequestService } from 'src/app/services/request.service';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public requestService: RequestService,
  ) { }

  guest: boolean;
  requests: User[] = [];
  logged_id: number;

  ngOnInit(): void {
    let user = this.authService.getUser();
    if(!user){
      this.guest = true;
      console.log("neregistrovan korisnik");
    }
    else{
      this.guest = false;
      console.log("registrovan korisnik");
      console.log(user.profile_id);
      this.logged_id = user.profile_id;
      this.requestService.get_requests(user.id).subscribe(
        (users: User[]) => {
          this.requests = users;
          console.log(this.requests);
        }
      );
      
    }
  }

  accept(id: number){
    console.log("id followera");
    console.log(id);
    this.requestService.accept_request(id, this.logged_id).subscribe();
    this.ngOnInit();
  }

  

}
