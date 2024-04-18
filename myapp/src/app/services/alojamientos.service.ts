import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {
  url = "http://localhost:3000/api/alojamientos";
  urlServicios = "http://localhost:3000/api/servicios";
  urlCalificaciones = "http://localhost:3000/api/calificaciones";
  urlComentarios = "http://localhost:3000/api/comentarios";
  urlAdmin = "http://localhost:3000/api/alojamientosAdmin";
  urlAdd = "http://localhost:3000/api/alojamientosAdd";
  urlCar = "http://localhost:3000/api/alojamientosCar";
  urlUbi = "http://localhost:3000/api/alojamientosUbi";
  urlFotos = "http://localhost:3000/api/fotos";

  constructor(private http: HttpClient) { }

  obtenerAlojamientos(): Observable<any>{
    return this.http.get(this.url);
  }

  obtenerAlojamientosPorUsuario(id: number): Observable<any>{
    return this.http.get(this.urlAdmin+"/"+id);
  }

  agregarAlojamiento(alojamiento: any): Observable<any> {
    return this.http.post(this.urlAdd, alojamiento);
  }

  agregarCaracteristicas(caracteristicas: any): Observable<any> {
    return this.http.post(this.urlCar, caracteristicas);
  }

  agregarUbicacion(ubicacion: any): Observable<any> {
    return this.http.post(this.urlUbi, ubicacion);
  }

  obtenerDetalleAlojamiento(id: number): Observable<any>{
    return this.http.get(this.url+"/"+id);
  }
  obtenerServiciosAlojamiento(id: number): Observable<any>{
    return this.http.get(this.urlServicios+"/"+id);
  }

  obtenerCalificaciones(id: number): Observable<any>{
    return this.http.get(this.urlCalificaciones+"/"+id);
  }

  obtenerComentarios(id: number): Observable<any>{
    return this.http.get(this.urlComentarios+"/"+id);
  }

  subirFoto(idAlojamiento: number, fotoUrl: string): Observable<any> {
    // Preparar los datos de la foto
    const formData = new FormData();
    formData.append('id_alojamiento', idAlojamiento.toString());
    formData.append('foto', fotoUrl);
    
    // Enviar solicitud POST al servidor
    return this.http.post(this.urlFotos, formData);
}


}
