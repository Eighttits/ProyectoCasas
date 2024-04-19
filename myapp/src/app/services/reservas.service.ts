import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  url = "http://localhost:3000/api/reservas";

  // url = "https://9fb8-189-177-178-192.ngrok-free.app/api/reservas";

  constructor(private http: HttpClient) { }

  realizarReserva(datos: any): Observable<any> {
    return this.http.post<any>(this.url, datos);
  }

  verificarReservas(id: number, fechaInicio: string, fechaFin: string): Observable<any> {
    const urlWithParams = `${this.url}/${id}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    return this.http.get(urlWithParams);
  }  

  obtenerReservas(): Observable<any>{
    return this.http.get(this.url);
  }

}
