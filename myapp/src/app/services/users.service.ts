import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = "http://localhost:3000/api/usuarios";
  urlLogin = "http://localhost:3000/api/login";

  constructor(private http: HttpClient) { }


  // Método para realizar la petición HTTP GET
  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerUsuario(id:number): Observable<any> {
    return this.http.get(this.url+"/"+id);
  }

  logout(): void {
    localStorage.removeItem('id'); // Elimina el usuario del almacenamiento local
  }

  isLoggedIn(): boolean {
    // Verifica si hay información de sesión en el almacenamiento local
    // Devuelve true si hay información de sesión, de lo contrario, devuelve false
    return !!localStorage.getItem('correo');
  }

  crearUsuario(datos: any): Observable<any> {
    return this.http.post<any>(this.url, datos);
  }

  loginUsuario(datos: any): Observable<any> {
    return this.http.post<any>(this.urlLogin, datos);
  }

}