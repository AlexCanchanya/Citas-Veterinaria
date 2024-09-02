import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../clases/cita';

@Injectable({
  providedIn: 'root'
})

export class CitasService {

  private baseURL = "http://localhost:8070/Citas";

  constructor(private httpClient: HttpClient) { }

  obtenerlistacitas(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/listar`);
  }

  registrarCitas(citas: any): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/registrar`, citas);
  }

  actualizarCitas(citas: any): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/actualizar`, citas);
  }

  buscarPorId(idcita: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/buscar/${idcita}`);
  }

  
  //eliminarCitas(idcita: number): Observable<Object> {
  //  return this.httpClient.delete(`${this.baseURL}/eliminar/${idcita}`);
  //}

  obtenerCitasPorMesEstado(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/reportePorMesEstado`);
  }

  obtenerCitaPorIdMascota(idmascota: number): Observable<Cita[]> {
    return this.httpClient.get<Cita[]>(`${this.baseURL}/buscarpormascota/${idmascota}`);
  }
}