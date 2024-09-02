import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VeterinariosService {

  private baseURL = "http://localhost:8070/Veterinario"; 

  constructor(private httpClient: HttpClient) { }


  obtenerListaVeterinarios(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/listar`);
  }

  registrarVeterinario(veterinario: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/registrar`, veterinario);
  }

  actualizarVeterinario(veterinario: any): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/actualizar`, veterinario);
  }

  buscarPorId(idveterinario: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/buscar/${idveterinario}`);
  }

  eliminarVeterinario(idveterinario: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/eliminar/${idveterinario}`);
  }


}
