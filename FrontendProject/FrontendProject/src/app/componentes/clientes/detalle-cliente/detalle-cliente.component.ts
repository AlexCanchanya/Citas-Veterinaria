import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../../servicios/clientes.service';
import { MascotasService } from '../../../servicios/mascotas.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrl: './detalle-cliente.component.css'
})

export class DetalleClienteComponent implements OnInit {

  cliente: any = {}
  mascota: any ={}
  mostrarDatos: boolean = true;
  mostrarMascotas: boolean = true;
  sumaTotal: number | null = null; // Para almacenar la suma total
  isVisible: boolean = false;  //Para ocultar el resumend finacierco

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }


  constructor(private route: ActivatedRoute,
    private clientesService: ClientesService,
    private mascotasService: MascotasService,
    private router: Router
  ) {}


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.clientesService.buscarPorId(id).subscribe(cliente => {
    this.cliente = cliente; 

    this.mascotasService.obtenerMascotasporIdcliente(id).pipe(
        catchError(err => {
          if (err.status === 404) {
            return of(null);
          }
          throw err;
        })
      ).subscribe(mascota => {
        this.mascota = mascota;
      });
    });
  }

  registrarMascota(): void {
    const idCliente = this.cliente.idcliente;
    this.router.navigate(['mascotas/registrar', { idcliente: idCliente }]);
  }

  verDetallesMascota(id: number): void {
    this.router.navigate(['mascotas/detalles', id]);
  }

  editarCliente(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }
  
}
