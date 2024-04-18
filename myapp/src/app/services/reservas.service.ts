import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  url = "http://localhost:3000/api/reservas";

  constructor(private http: HttpClient) { }

  realizarReserva(datos: any): Observable<any> {
    console.log(datos);
    return this.http.post<any>(this.url, datos);
  }

}
