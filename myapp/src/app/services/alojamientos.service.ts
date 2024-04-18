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

  constructor(private http: HttpClient) { }

  obtenerAlojamientos(): Observable<any>{
    return this.http.get(this.url);
  }

  obtenerAlojamientosPorUsuario(): Observable<any>{
    const urlConParametros = `${this.url}?localStorage.getItem('correo')`;
    return this.http.get(urlConParametros);
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

}
