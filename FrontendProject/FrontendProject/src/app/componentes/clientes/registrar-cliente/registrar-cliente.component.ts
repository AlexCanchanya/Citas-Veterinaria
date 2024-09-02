import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../../servicios/clientes.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})
export class RegistrarClienteComponent {

  cliente: any = {
    idcliente: 0,
    nomcliente: '',
    apecliente: '',
    dnicliente: '',
    dircliente: '',
    telfcliente: '',
    emailcliente: '',
    sexcliente: '',
    estcliente: true
  };

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private location: Location,
  ) { }

  validarYRegistrarCliente(): void {
    if (!this.cliente.nomcliente || !this.cliente.apecliente || !this.cliente.dnicliente ||
      !this.cliente.dircliente || !this.cliente.telfcliente || !this.cliente.emailcliente ||
      !this.cliente.sexcliente) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Por favor complete todos los campos.'
        });
        return;
    }
    this.registrarCliente();
  }

  registrarCliente(): void {
    this.clientesService.registrarCliente(this.cliente).subscribe(
      response => {
        //'Cliente registrado correctamente'//
        console.log('Cliente registrado:', response);
        Swal.fire({
          icon: 'success',  // Cambia el ícono a 'success' para indicar una operación exitosa
          title: '¡Registro Exitoso!',
          text: 'Los datos del cliente han sido registrados correctamente.'
        });
        const idClienteRegistrado = response.idcliente; 
        this.router.navigate([`clientes/detalle/${idClienteRegistrado}`]);
      },
      error => {
        console.error('Error al registrar cliente', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al registrar el cliente. Inténtelo de nuevo más tarde.'
        });
      }
    );
  }

  volverAtras(): void {
    this.location.back();
  }

}


