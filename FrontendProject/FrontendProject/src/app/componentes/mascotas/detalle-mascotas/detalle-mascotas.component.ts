import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from '../../../servicios/mascotas.service';
import { HistorialService } from '../../../servicios/historial.service';
import { catchError, forkJoin, of } from 'rxjs';
import { CitasService } from '../../../servicios/citas.service';

@Component({
  selector: 'app-detalle-mascotas',
  templateUrl: './detalle-mascotas.component.html',
  styleUrl: './detalle-mascotas.component.css'
})

export class DetalleMascotasComponent implements OnInit {

  mostrarDatos: boolean = true;
  mostrarHistorial: boolean = false;
  mostrarDetalle: boolean = false;
  mascota: any = {}; 
  cita: any = {};
  detalleHistorial: any = {}; // Propiedad para almacenar los detalles del historial ///  detalleHistorial: any = null; //
  error: string = ''; 


  constructor(private route: ActivatedRoute,
    private mascotasService: MascotasService,
    private router: Router,
    private citaService: CitasService
  ) {}


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    forkJoin({
      mascota: this.mascotasService.buscarPorId(id),
      cita: this.citaService.obtenerCitaPorIdMascota(id).pipe(
        catchError(err => {
          if (err.status === 404) {
            return of(null);
          }
          throw err;
        })
      )
    }).subscribe(results => {
      this.mascota = results.mascota;
      this.cita = results.cita;
    });
  }

  
  editarMascota(id: number): void {
    this.router.navigate(['mascotas/editar', id]);
  }

  mostrarDatosMascota() {
    this.mostrarDatos = true;
    this.mostrarHistorial = false;
    this.mostrarDetalle = false;
  }

  mostrarHistorialClinico() {
    this.mostrarDatos = false;
    this.mostrarHistorial = true;
    this.mostrarDetalle = false;

  }

  mostrarDetalleHistorial(idcita: number) {
    this.citaService.buscarPorId(idcita).subscribe(
      (detalle) => {
        this.detalleHistorial = detalle;
        this.mostrarDatos = false;
        this.mostrarHistorial = false;
        this.mostrarDetalle = true;
      },
      (error) => {
        this.error = 'Error al cargar los detalles del historial';
      }
    );
  }

  registrarCitas(): void {
    const idCliente = this.mascota.cliente.idcliente;
    const idMascota = this.mascota.idmascota;
    this.router.navigate(['citas/registrar', { idcliente: idCliente, idmascota: idMascota }]);
  }

  verDetallesCliente(id: number): void {
    this.router.navigate(['clientes/detalle', id]);
  }

  get inicialMascota(): string {
    return this.mascota.nommascota ? this.mascota.nommascota.charAt(0).toUpperCase() : '';
  }
  
}
