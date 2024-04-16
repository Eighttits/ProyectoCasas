import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { AlojamientosService } from '../services/alojamientos.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  alojamientos: any[] = [];

  constructor(private router: Router, private alojamientosService: AlojamientosService) {}
  
  ngOnInit() {
    this.obtenerAlojamientos();
  }

  obtenerAlojamientos() {
    this.alojamientosService.obtenerAlojamientos().subscribe(
      (data) => {
        this.alojamientos = data;
      },
      (error) => {
        console.error('Error al obtener alojamientos:', error);
      }
    );
  }

  routerUsuarioPage() {
    this.router.navigate(["../usuario"]);
  }
  routerCamera() {
    this.router.navigate(["/menu/camara"]);
  }
  routerContacts() {
    this.router.navigate(["/menu/contactos"]);
  }
}
