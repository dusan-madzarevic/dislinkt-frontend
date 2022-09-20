import { Component, OnInit } from '@angular/core';
import { PostCreate } from 'src/app/models/postcreate';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/image.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(
    public postService: PostService,
    public imageService: ImageService,
    public authService: AuthenticationService
  ) { }

  fileName: string = '';
  file: File;
  text: string = '';


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


  createPost(){
    let user = this.authService.getUser();
    const post = {} as PostCreate;
    post.text = this.text;
    post.user_id = user.id;
    post.picture="";
    if (this.file){
      const formData: FormData = new FormData();
      
      formData.append('file', this.file);
      this.imageService.uploadImage(formData).subscribe();
      post.picture = this.fileName;
    }
    console.log(post);
    this.postService.addPost(post).subscribe(
      result => {
        window.location.reload();
      }
    );

  }
  
}
