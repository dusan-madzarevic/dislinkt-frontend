import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-short',
  templateUrl: './profile-short.component.html',
  styleUrls: ['./profile-short.component.css']
})
export class ProfileShortComponent implements OnInit {

  constructor() { }

  @Input() name: string;
  @Input() surname: string;
  @Input() date: string;
  @Input() picture: string;

  ngOnInit(): void {
  }

}
