import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from '../../services/alojamientos.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.page.html',
  styleUrls: ['./casa.page.scss'],
})
export class CasaPage implements OnInit {

  detalleAlojamiento: any[] = [];
  serviciosAlojamiento: any[] = [];
  calificacionesAlojamiento: any[] = [];
  comentariosAlojamiento: any[] = [];
  idUsuario: number;
  idAlojamiento : number;
  correo : string;
  reservas: any[] = [];

  constructor(private alojamientosService: AlojamientosService, private route: ActivatedRoute, public alertController: AlertController, private usuariosService: UsersService, private router: Router, private reservasService: ReservasService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.idAlojamiento = +id;
      }
    });
    
    this.obtenerDetalleAlojamiento(this.idAlojamiento);
    this.obtenerServiciosAlojamiento(this.idAlojamiento);
    this.obtenerCalificaciones(this.idAlojamiento);
    this.obtenerComentarios(this.idAlojamiento);
  }

  obtenerDetalleAlojamiento(idAlojamiento: number) {
    this.alojamientosService.obtenerDetalleAlojamiento(idAlojamiento).subscribe(
      (data) => {
        this.detalleAlojamiento = data;
      },
      (error) => {
        console.error('Error al obtener detalle de  alojamiento:', error);
      }
    );
  }
  obtenerServiciosAlojamiento(idAlojamiento: number) {
    this.alojamientosService.obtenerServiciosAlojamiento(idAlojamiento).subscribe(
      (data) => {
        this.serviciosAlojamiento= data;
      },
      (error) => {
        console.error('Error al obtener servicios de alojamiento:', error);
      }
    );
  }

  obtenerCalificaciones(idAlojamiento: number) {
    this.alojamientosService.obtenerCalificaciones(idAlojamiento).subscribe(
      (data) => {
        this.calificacionesAlojamiento= data;
      },
      (error) => {
        console.error('Error al obtener calificaciones de alojamiento:', error);
      }
    );
  }

  obtenerComentarios(idAlojamiento: number) {
    this.alojamientosService.obtenerComentarios(idAlojamiento).subscribe(
      (data) => {
        this.comentariosAlojamiento= data;
      },
      (error) => {
        console.error('Error al obtener comentarios de alojamiento:', error);
      }
    );
  }

  getArrayEstrellas(calificacion: number): number[] {
    const estrellasTotales = 5; // Número total de estrellas
    const numEstrellasPintadas = calificacion;
    const estrellasPintadas = Math.min(numEstrellasPintadas, estrellasTotales); // Limitamos el número de estrellas pintadas al máximo de estrellas totales
    const estrellasEnBlanco = estrellasTotales - estrellasPintadas; // Calculamos el número de estrellas en blanco
    // Creamos un array que contenga las estrellas pintadas seguidas de las estrellas en blanco
    return Array.from({ length: estrellasPintadas }, () => 1).concat(Array.from({ length: estrellasEnBlanco }, () => 0));
  }

  async reservar(idAlojamiento: number, precio: number) {
    const today = new Date();
    const fechaHoy = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    if (!this.usuariosService.isLoggedIn() || localStorage.getItem('rol')!='user') {
      this.router.navigate(["../login"]);
    } else{
      const storedCorreo = localStorage.getItem('correo');
      if(storedCorreo !== null) {
        this.correo = storedCorreo;
      }
      this.obtenerIdUsuario(this.correo);
      const alert = await this.alertController.create({
        header: 'Reservar',
        inputs: [
          {
            name: 'fechaInicio',
            type: 'date',
            placeholder: 'Fecha de inicio'
          },
          {
            name: 'fechaFin',
            type: 'date',
            placeholder: 'Fecha de fin'
          }
        ],
        message: 'Elija las fechas de su reserva',
        buttons: [
          {
            text: 'Aceptar',
            handler: (data) => {
              data.idAlojamiento = idAlojamiento;
              data.total = precio;
              data.idCliente= this.idUsuario;
              if(data.fechaInicio>=fechaHoy && data.fechaFin>data.fechaInicio) {
                this.reservasService.verificarReservas(data.idAlojamiento, data.fechaInicio, data.fechaFin).subscribe(
                  (data2) => {
                    this.reservas = data2;
                    if(this.reservas.length>0) {
                      this.alertaReservas();
                    } else {
                      this.reservasService.realizarReserva(data).subscribe(
                        (response) => {
                          console.log(response);
                          if(response.status===true) {
                            this.alertaReservaCorrecta();
                          }
                        },
                        (error) => {                    
                          console.error('Error al realizar la reserva:', error);
                        }
                       );
                    }
                  },
                  (error) => {
                    console.error('Error al obtener reservas:', error);
                  }
                );
              } else {
                this.alertaFechas();
              }
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Reserva cancelada');
            }
          }
        ]
      });
    
      await alert.present();
    }
    
  }

  obtenerIdUsuario(correo: string) {
    this.usuariosService.obtenerIdUsuario(correo).subscribe(
      (data) => {
        // Verificar si data es un array y tiene al menos un elemento
        if (Array.isArray(data) && data.length > 0) {
          // Extraer el valor del primer elemento del array y asignarlo a this.idUsuario
          this.idUsuario = data[0].id; // Asumiendo que el id del usuario está en una propiedad llamada 'id'
        } else {
          console.error('El resultado obtenido no es válido:', data);
        }
      },
      (error) => {
        console.error('Error al obtener id usuario:', error);
      }
    );
  }

  async alertaFechas() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Introduzca fechas válidas',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async alertaReservas() {
    const alert = await this.alertController.create({
      header: 'Alojamiento no disponible',
      message: 'Favor de seleccionar otras fechas',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async alertaReservaCorrecta() {
    const alert = await this.alertController.create({
      header: 'Reservado',
      message: 'Su reserva se ha completado correctamente',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  verificarReservas(id: number, fechaInicio: string, fechaFin: string) {
   
  }
  
}
