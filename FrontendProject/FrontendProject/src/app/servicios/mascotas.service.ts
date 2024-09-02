import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascotas } from '../clases/mascotas';

@Injectable({
  providedIn: 'root'
})

export class MascotasService {

  private baseURL = "http://localhost:8070/Mascota";

  constructor(private httpClient: HttpClient) { }

  
  obtenerListaMascotas(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/listar`);
  }
  registrarMascota(mascota: any): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/registrar`, mascota);
  }

  actualizarMascota(mascota: any): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/actualizar`, mascota);
  }

  buscarPorId(idmascota: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/buscar/${idmascota}`);
  }

  eliminarMascota(idmascota: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/eliminar/${idmascota}`);
  }

  obtenerMascotasporIdcliente(idcliente: number): Observable<Mascotas[]> {
    return this.httpClient.get<Mascotas[]>(`${this.baseURL}/buscarporcliente/${idcliente}`);
  }

  obtenerMascotasPorMes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/reportePorMes`);
  }
  
}