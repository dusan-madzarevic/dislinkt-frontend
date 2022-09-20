import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-short',
  templateUrl: './profile-short.component.html',
  styleUrls: ['./profile-short.component.css']
})
export class ProfileShortComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  @Input() id: number;
  @Input() name: string;
  @Input() surname: string;
  @Input() date: string;
  @Input() picture: string;
  @Input() small: string;

  ngOnInit(): void {
  }

  redirect(): void{
    this.router.navigate(['/profiles', this.id]);
  }
}
