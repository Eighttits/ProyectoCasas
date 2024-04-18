import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from '../../services/alojamientos.service';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.page.html',
  styleUrls: ['./add-house.page.scss'],
})
export class AddHousePage implements OnInit {
  public nombre = '';
  public descripcion = '';
  public tipo = 'Casa';
  public direccion = '';
  public precioPorNoche = '';
  public pais = '';
  public estado = '';
  public ciudad = '';
  public codigoPostal = '';
  public idUsuario: number;
  public fotos: string[] = []; // Array para almacenar las fotos

  constructor(
    private alojamientosService: AlojamientosService,
    private router: Router,
    private camera: Camera
  ) {}

  ngOnInit() {
    const idUsuario = localStorage.getItem('idusuario');
    if (idUsuario !== null) {
      this.idUsuario = +idUsuario;
    } else {
      console.error('ID de usuario no está presente en localStorage');
    }
    console.log('ID de usuario:', this.idUsuario);
  }

  async cargarFoto() {
    try {
      const image = await this.camera.getPicture({
        quality: 90,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
      });

      if (image) {
        // Agregar la URL de la foto al array de fotos
        this.fotos.push(image);
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  agregarCasa() {
    const nuevoAlojamiento = {
      tipo: this.tipo,
      direccion: this.direccion,
      precio_noche: this.precioPorNoche,
      id_usuario: this.idUsuario,
    };

    this.alojamientosService.agregarAlojamiento(nuevoAlojamiento).subscribe(
      response => {
        console.log('Alojamiento añadido con éxito:', response);
        const idAlojamiento = response.id;

        const caracteristicas = {
          nombre: this.tipo,
          descripcion: this.descripcion,
          id_alojamiento: idAlojamiento,
        };

        this.alojamientosService.agregarCaracteristicas(caracteristicas).subscribe(
          responseCaracteristicas => {
            console.log('Características añadidas con éxito:', responseCaracteristicas);
          },
          errorCaracteristicas => {
            console.error('Error al agregar características:', errorCaracteristicas);
          }
        );

        const ubicacion = {
          pais: this.pais,
          estado: this.estado,
          ciudad: this.ciudad,
          codigo_postal: this.codigoPostal,
          id_alojamiento: idAlojamiento,
        };

        this.alojamientosService.agregarUbicacion(ubicacion).subscribe(
          responseUbicacion => {
            console.log('Ubicación añadida con éxito:', responseUbicacion);
          },
          errorUbicacion => {
            console.error('Error al agregar ubicación:', errorUbicacion);
          }
        );

        // Guardar las fotos en la base de datos
        this.fotos.forEach(foto => {
          this.alojamientosService.subirFoto(idAlojamiento, foto).subscribe(
            responseFoto => {
              console.log('Foto añadida con éxito:', responseFoto);
            },
            errorFoto => {
              console.error('Error al agregar foto:', errorFoto);
            }
          );
        });

        this.router.navigate(['pagesAdmin/home-admin']);
      },
      error => {
        console.error('Error al agregar alojamiento:', error);
      }
    );
  }
}
