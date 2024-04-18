import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {
  url = "http://localhost:3000/api/alojamientos";
  urlServicios = "http://localhost:3000/api/servicios";

  constructor(private http: HttpClient) { }

  obtenerAlojamientos(): Observable<any>{
    return this.http.get(this.url);
  }
<<<<<<< HEAD

  obtenerAlojamientosPorUsuario(): Observable<any>{
    const urlConParametros = `${this.url}?localStorage.getItem('correo')`;
    return this.http.get(urlConParametros);
=======
  obtenerDetalleAlojamiento(id: number): Observable<any>{
    return this.http.get(this.url+"/"+id);
  }
  obtenerServiciosAlojamiento(id: number): Observable<any>{
    return this.http.get(this.urlServicios+"/"+id);
>>>>>>> 6de34994f33afc763a16bb6c6b61752f2e2dc266
  }
}
