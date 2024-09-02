import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Credentials } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseURL = 'http://localhost:8070/Usuario';

  constructor(private httpClient: HttpClient) { }

  buscarPorId(idusuario: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/buscar2/${idusuario}`);
  }

  obtenerListaUsuarios(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/listar2`);
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/registrar`, usuario);
  }

  actualizarUsuario(usuario: any): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/actualizar`, usuario);
  }
  

  login(creds: Credentials) {
    return this.httpClient.post('http://localhost:8070/Login', creds, {
        observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;
        const token = headers.get('Authorization')!;
        localStorage.setItem('token', token);
        console.log('Token guardado:', token); // Añadir esto para depurar
        return body;
    }));
  }

  //pra buscar el rol deacuerdo al username
  obtenerUsuarioPorNick(nickusuario: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/buscarPorNick/${nickusuario}`);
}

  getToken() {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Añadir esto para depurar
    return token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    console.log('Token y rol eliminados');
  }
}