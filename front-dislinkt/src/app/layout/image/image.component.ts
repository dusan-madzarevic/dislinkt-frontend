import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(
    public imageService: ImageService
  ) { }

  @Input() imagePath: string;
  @Input() post: boolean;
  
  @ViewChild('img') img: ElementRef;

  ngOnInit(): void {
    this.getImage();
  }

  getImage(): void{
    this.imageService.getImage(this.imagePath).subscribe(
      (blob: Blob) => {
        var objectURL = URL.createObjectURL(blob);
        this.img.nativeElement.setAttribute('src', objectURL);
    });
  }


}
