import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor() { }

  fileName: String = '';
  file: File;

  ngOnInit(): void {
  }

  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        this.file = file;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.addEventListener(
          "loadend",
          ev => {
            let readableString = fileReader.result.toString();
            let previewImage = <HTMLImageElement>document.getElementById("imagePreview");
            previewImage.src = readableString;
          }
        )
    }
  }
}
