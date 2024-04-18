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
  urlLoginAdmin = "http://localhost:3000/api/loginAdmin";

  constructor(private http: HttpClient) { }


  // Método para realizar la petición HTTP GET
  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerUsuario(id:number): Observable<any> {
    return this.http.get(this.url+"/"+id);
  }


  isLoggedIn(): boolean {
    // Verifica si hay información de sesión en el almacenamiento local
    // Devuelve true si hay información de sesión, de lo contrario, devuelve false
    return !!localStorage.getItem('correo');
  }

  destroySession(): void {
    // Elimina cualquier información de sesión del almacenamiento local
    localStorage.removeItem('correo');
    localStorage.removeItem('rol');
    // Otros pasos opcionales para limpiar cualquier otro tipo de información de sesión
}


  crearUsuario(datos: any): Observable<any> {
    return this.http.post<any>(this.url, datos);
  }

  loginUsuario(datos: any): Observable<any> {
    return this.http.post<any>(this.urlLogin, datos);
  }

  loginAdmin(datos: any): Observable<any> {
    return this.http.post<any>(this.urlLoginAdmin, datos);
  }

}