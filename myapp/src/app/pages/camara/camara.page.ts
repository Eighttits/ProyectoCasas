import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  photo = "";
  constructor(private camera: Camera) { }
  
  ngOnInit() {
  }

  tomarFoto() {
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }

  subirFoto(){
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  public takePicture(sourceType:any) {
    // create options for the Camera Dialog
    var options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.photo = (<any>window).Ionic.WebView.convertFileSrc(imageData);
    });
  }

}
