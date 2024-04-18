import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from '../../services/alojamientos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  alojamientos: any[] = [];

  constructor(private router: Router, private alojamientosService: AlojamientosService) { }

  obtenerAlojamientos() {
    this.alojamientosService.obtenerAlojamientosPorUsuario().subscribe(
      (data) => {
        this.alojamientos = data;
      },
      (error) => {
        console.error('Error al obtener alojamientos:', error);
      }
    );
  }

  ngOnInit() {
  }

}
