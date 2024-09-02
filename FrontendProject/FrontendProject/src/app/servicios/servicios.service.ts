import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiciosService {

  private baseURL = "http://localhost:8070/Servicios";

  constructor(private httpClient: HttpClient) { }

  obtenerListaServicios(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/listar`);
  }

}
