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
  public tipoAutenticacion = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private usuariosService: UsersService
  ) { }

  ngOnInit() {
    console.log("hola");
  }

  regresar() {
    this.router.navigate(["/home"]);
  }

  async ingresar() {
    if (this.correo == '' || this.password == "") {
      const alert = await this.alertController.create({
        header: "ERROR AUTENTICACIÓN",
        message: "El correo o contraseña se encuentran vacíos, favor de validar",
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
    } else {
      let datos = {
        correo: this.correo,
        password: this.password
      };

      if (this.tipoAutenticacion) {
        this.usuariosService.loginAdmin(datos)
          .subscribe(
            async respuesta => {
              if (respuesta.status) {
                localStorage.setItem('idusuario', respuesta.datos[0].id);
                console.log(localStorage.getItem('idusuario'));
                this.router.navigate(["pagesAdmin/home-admin"]);
                localStorage.setItem('correo', this.correo);
                localStorage.setItem('rol', 'admin');
                this.router.navigate(["pagesAdmin/home-admin"]);
              } else {
                const alert = await this.alertController.create({
                  header: "ERROR AUTENTICACIÓN",
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
      } else {
        this.usuariosService.loginUsuario(datos)
          .subscribe(
            async respuesta => {
              if (respuesta.status) {
                this.router.navigate(["/home"]);

                localStorage.setItem('idusuario', respuesta.datos[0].id);
                localStorage.setItem('correo', this.correo);
                localStorage.setItem('rol', 'user');
              } else {
                const alert = await this.alertController.create({
                  header: "ERROR AUTENTICACIÓN",
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
}
