import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public correo = "";
  public password = "";

  constructor(private router: Router,private toastController: ToastController,
    private alertController: AlertController, private usuariosService: UsersService) { }

  ngOnInit() {
    console.log("hola");
  }

  regresar(){
    this.router.navigate(["/home"]);
  }

  async ingresar(){
    // console.log("Usuario: "+this.usuario +"    Contraseña: "+ this.password );
    if(this.correo == '' || this.password == "" ){
      const alert = await this.alertController.create({
        header: "ERROR AUTENTICACIÓN",
        message: "El correo o contraseña se encuentran vacios, favor de validar",
        buttons: [
          {
            text: 'Aceptar',
            role: 'confirm',
            handler: () => {
              console.log('Alert confirmed');
            },
          },
        ]
      });
      await alert.present();
    }else{
      let datos = {
        correo: this.correo,
        password: this.password
      };

      this.usuariosService.loginUsuario(datos)
    .subscribe(
      async respuesta => {
        //console.log(respuesta);
        if(respuesta.status){
          this.router.navigate(["/home"]);
          localStorage.setItem('correo',respuesta.datos[0].correo);
        }else{
          const alert = await this.alertController.create({
            header:  "ERROR AUTENTICACIÓN",
            message: respuesta.message,
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                handler: () => {
                  // console.log('Alert canceled');
                },
              },
            ]
          });
          await alert.present();
        }
      },
      error => {
        console.error(error);
        // Manejar errores de manera adecuada
      }
    );
    }
  }

}