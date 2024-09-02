import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from '../../../servicios/mascotas.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ClientesService } from '../../../servicios/clientes.service';

@Component({
  selector: 'app-registrar-mascota',
  templateUrl: './registrar-mascota.component.html',
  styleUrl: './registrar-mascota.component.css'
})
export class RegistrarMascotaComponent {

  mascota: any = {
    idmascota: 0,
    nommascota: '',
    espmascota: '',
    razamascota: '',
    edadmascota: 0,
    estmascota: true,
    pesomascota: 0,
    sexomascota: '',
    alimascota: '',
    castrado: '',
    fechareg: '',
    cliente: {
      idcliente: 0,
    }
  };

  clientes: any[] = [];
  camposCargados: boolean = false;

  constructor(private mascotasService: MascotasService,
    private router: Router,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private location: Location,

  ) { }

  validarYRegistrarMascota(): void {
    if (!this.mascota.nommascota || !this.mascota.espmascota || !this.mascota.razamascota ||
      !this.mascota.edadmascota || !this.mascota.pesomascota || !this.mascota.sexomascota ||
      !this.mascota.alimascota || !this.mascota.castrado || !this.mascota.fechareg || !this.mascota.cliente.idcliente) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Por favor complete todos los campos.'
        });
        return;
    }
    this.registrarMascota();
  }

  registrarMascota(): void {
    this.mascotasService.registrarMascota(this.mascota).subscribe(response => {
      console.log('mascota registrado:', response);
      Swal.fire({
        icon: 'success',  // Cambia el ícono a 'success' para indicar una operación exitosa
        title: '¡Registro Exitoso!',
        text: 'La mascota ha sido registrada correctamente.'
      });      
      this.location.back();
    },
      error => {
        console.error('Error al registrar mascota', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al registrar a la mascota. Inténtelo de nuevo más tarde.'
        });
      }
    );
  }

  ngOnInit(): void {
    this.cargarClientes();
    this.mascota.fechareg = this.getCurrentDate();
    const idClienteStr = this.route.snapshot.paramMap.get('idcliente');
    if (idClienteStr) {
      const idCliente = +idClienteStr;
      this.cargarCampoCliente(idCliente);
    }
  }

  //Cargara el nombre del cliente , si se accede al formulario desde DetalleClienteComponent
  cargarCampoCliente(idCliente: number): void {
    this.clientesService.buscarPorId(idCliente).subscribe(cliente => {
      this.mascota.cliente = cliente;
      this.camposCargados = true; 
    }, error => {
      console.error('Error al obtener el cliente', error);
    });
  }

  cargarClientes() {
    this.clientesService.obtenerListaClientes().subscribe(data => {
      this.clientes = data;
    }, error => {
      console.error('Error al obtener los clientes', error);
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  volverAtras(): void {
    this.location.back();
  }

}
