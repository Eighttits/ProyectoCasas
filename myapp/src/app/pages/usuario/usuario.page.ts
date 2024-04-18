import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  reservasUsuario: any[] = [];
  idUsuario : number;
  correo : string;

  constructor(private usuariosService: UsersService, private router: Router) { }

  ngOnInit() {
    if (!this.usuariosService.isLoggedIn()) {
      this.router.navigate(["../login"]);
    } else {
      const storedCorreo = localStorage.getItem('correo');
      if(storedCorreo !== null) {
        this.correo = storedCorreo;
      }
      this.obtenerIdUsuario(this.correo);
    }
  }

  destruirSesion(){
    this.usuariosService.destroySession();
    location.reload();
  }

  obtenerReservasUsuario(idUsuario: number) {
    this.usuariosService.obtenerReservasUsuario(idUsuario).subscribe(
      (data) => {
        // Verificar si data es un array y tiene al menos un elemento
        if (Array.isArray(data) && data.length > 0) {
          // Asignar el array de reservasUsuario
          this.reservasUsuario = data;
        } else {
          console.error('El resultado obtenido no es válido:', data);
        }
      },
      (error) => {
        console.error('Error al obtener detalle de  alojamiento:', error);
      }
    );
  }
  
  obtenerIdUsuario(correo: string) {
    this.usuariosService.obtenerIdUsuario(correo).subscribe(
      (data) => {
        // Verificar si data es un array y tiene al menos un elemento
        if (Array.isArray(data) && data.length > 0) {
          // Extraer el valor del primer elemento del array y asignarlo a this.idUsuario
          this.idUsuario = data[0].id; // Asumiendo que el id del usuario está en una propiedad llamada 'id'
          this.obtenerReservasUsuario(this.idUsuario);
        } else {
          console.error('El resultado obtenido no es válido:', data);
        }
      },
      (error) => {
        console.error('Error al obtener id usuario:', error);
      }
    );
  }

}
