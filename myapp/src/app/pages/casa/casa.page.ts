import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from '../../services/alojamientos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.page.html',
  styleUrls: ['./casa.page.scss'],
})
export class CasaPage implements OnInit {

  detalleAlojamiento: any[] = [];
  idAlojamiento : number;

  constructor(private alojamientosService: AlojamientosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.idAlojamiento = +id;
      }
    });
    
    this.obtenerDetalleAlojamiento(this.idAlojamiento);
  }

  obtenerDetalleAlojamiento(idAlojamiento: number) {
    this.alojamientosService.obtenerDetalleAlojamiento(idAlojamiento).subscribe(
      (data) => {
        this.detalleAlojamiento = data;
      },
      (error) => {
        console.error('Error al obtener alojamientos:', error);
      }
    );
  }
}
