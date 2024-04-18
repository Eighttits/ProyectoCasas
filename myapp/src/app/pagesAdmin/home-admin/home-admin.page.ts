import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from '../../services/alojamientos.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  alojamientos: any[] = [];
  id: number | null = null;

  constructor(private router: Router, private alojamientosService: AlojamientosService, private usuariosService: UsersService) { }

  ngOnInit() {
    // Obtenemos el idusuario de localStorage
    console.log('id directo: ' + localStorage.getItem('idusuario'));
    const idUsuario = localStorage.getItem('idusuario');

    // Verificamos si idUsuario es válido (no null)
    if (idUsuario !== null) {
      // Convertimos el idUsuario de string a number
      this.id = +idUsuario;

      // Llamamos a obtenerAlojamientos con el idUsuario convertido a number
      this.obtenerAlojamientos(this.id);
    } else {
      console.error('ID de usuario no está presente en localStorage');
    }

    console.log('ID de usuario:', this.id);
  }

  obtenerAlojamientos(id: number) {
    // Llama a obtenerAlojamientosPorUsuario con idUsuario
    this.alojamientosService.obtenerAlojamientosPorUsuario(id).subscribe(
      (data) => {
        this.alojamientos = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener alojamientos:', error);
      }
    );
  }

  destruirSesion() {
    this.usuariosService.destroySession();
    this.router.navigate(['../login']);
  }
}
