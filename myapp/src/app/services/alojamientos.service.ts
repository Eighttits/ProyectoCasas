import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {
  url = "http://localhost:3000/api/alojamientos";

  constructor(private http: HttpClient) { }

  obtenerAlojamientos(): Observable<any>{
    return this.http.get(this.url);
  }
}
