import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../../servicios/clientes.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})

export class EditarClienteComponent implements OnInit {

  id: number;
  cliente: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientesService: ClientesService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.clientesService.buscarPorId(id).subscribe(
        data => {
          this.cliente = data;
        },
        error => {
          console.error('Error al obtener el cliente', error);
        }
      );
    } else {
      console.error('ID de cliente no encontrado en la ruta');
    }
  }

  actualizarCliente(): void {
    this.clientesService.actualizarCliente(this.cliente).subscribe(
      data => {
        console.log('Datos actualizados', data);
        Swal.fire({
          icon: 'success',  // Ícono que indica éxito
          title: '¡Modificación Exitosa!',
          text: 'Los datos del cliente han sido modificados correctamente.'
        });
        
        this.router.navigate([`clientes`]);
      },
      error => {
        console.error('Error al actualizar cliente', error);
      }
    );
  }

  volverAtras(): void {
    this.location.back();
  }

}