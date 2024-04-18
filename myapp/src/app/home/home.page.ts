import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlojamientosService } from '../services/alojamientos.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  alojamientos: any[] = [];
  filteredAlojamientos: any[] = []

  constructor(private router: Router, private alojamientosService: AlojamientosService) {}
  
  ngOnInit() {
    this.obtenerAlojamientos();
  }

  obtenerAlojamientos() {
    this.alojamientosService.obtenerAlojamientos().subscribe(
      (data) => {
        this.alojamientos = data;
        this.filterAlojamientos("");
      },
      (error) => {
        console.error('Error al obtener alojamientos:', error);
      }
    );
  }

  filterAlojamientos(event: any) {
    let searchTerm = (event.target as HTMLInputElement)?.value.trim();
    if (searchTerm) {
      // Filtrar alojamientos solo si hay un término de búsqueda
      this.filteredAlojamientos = this.alojamientos.filter((alojamiento) => {
        return alojamiento.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        // Puedes agregar más condiciones de búsqueda si es necesario
      });
    } else {
      // Si no hay término de búsqueda, mostrar todos los alojamientos
      this.filteredAlojamientos = this.alojamientos;
    }
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
  routerCasa(id: number) {
    this.router.navigate(["/../casa", id]);
  }

  prueba() {
    this.router.navigate(["pagesAdmin/add-house"]);
  }
}
