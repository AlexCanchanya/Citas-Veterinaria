import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  private baseURL = "http://localhost:8070/Cliente"; 

  constructor(private httpClient: HttpClient) { }

  obtenerListaClientes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/listar2`);
  }

  registrarCliente(cliente: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/registrar`, cliente);
  }

  actualizarCliente(cliente: any): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/actualizar`, cliente);
  }

  buscarPorId(idcliente: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/buscar2/${idcliente}`);
  }

  eliminarCliente(idcliente: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/eliminar/${idcliente}`);
  }

}