import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historial } from '../clases/historial';

@Injectable({
  providedIn: 'root'
})

export class HistorialService {

  private baseURL = "http://localhost:8070/Historial";

  constructor(private httpClient: HttpClient) { }

  obtenerlistahistorial(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/listar`);
  }

  obtenerHistorialPorIdMascota(idmascota: number): Observable<Historial[]> {
    return this.httpClient.get<Historial[]>(`${this.baseURL}/buscar/${idmascota}`);
  }

  buscarPorIdhistorial(idhistorial: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/buscarporid/${idhistorial}`);
  }
}