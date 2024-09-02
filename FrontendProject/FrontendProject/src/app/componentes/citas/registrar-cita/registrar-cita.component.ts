import { Component } from '@angular/core';
import { CitasService } from '../../../servicios/citas.service';
import { ClientesService } from '../../../servicios/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinariosService } from '../../../servicios/veterinarios.service';
import { UsuarioService } from '../../../servicios/usuario.service';
import { MascotasService } from '../../../servicios/mascotas.service';
import { ServiciosService } from '../../../servicios/servicios.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cita',
  templateUrl: './registrar-cita.component.html',
  styleUrl: './registrar-cita.component.css'
})

export class RegistrarCitaComponent {

  cita: any = {
    idcita: 0,
    cliente: {
      idcliente: 0,
    },
    veterinario: {
      idveterinario: 0,
    },
    servicios: {
      idservicio: 0,
    },
    mascotas: {
      idmascota: 0,
    },
    usuario: {
      idusuario: 0,
    },
    fechacita: '',
    horacita: '',
    observaciones: '',
    estcita: 'pendiente'

  };

  clientes: any[] = [];
  veterinarios: any[] = [];
  usuarios: any[] = [];
  servicios: any[] = [];
  mascotas: any[] = [];
  camposCargados: boolean = false;


  constructor(private citasService: CitasService,
    private router: Router,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private veterinariosService: VeterinariosService,
    private usuariosService: UsuarioService,
    private mascotasService: MascotasService,
    private serviciosService: ServiciosService,
    private location: Location


  ) { }

  ngOnInit(): void {
    this.cargarClientes();

    this.cargarVeterinarios();
    this.cargarUsuarios();
    this.cargarMascotas();
    this.cargarServicios();
    this.setFechaYHoraActual();
    //Obtenemos y cargamos los campos  desde los DetallesMascota
    const idClienteStr = this.route.snapshot.paramMap.get('idcliente');
    if (idClienteStr) {
      const idCliente = +idClienteStr;
      this.cargarCampoCliente(idCliente);
    }
    const idMascotaStr = this.route.snapshot.paramMap.get('idmascota');
    if (idMascotaStr) {
      const idMascota = +idMascotaStr;
      this.cargarCampoMascota(idMascota);
    }
  }

  cargarCampoCliente(idCliente: number): void {
    this.clientesService.buscarPorId(idCliente).subscribe(cliente => {
      this.cita.cliente = cliente;
      this.camposCargados = true;  // Cambiar a verdadero cuando el cliente se carga correctamente
    }, error => {
      console.error('Error al obtener el cliente', error);
    });
  }
  
  cargarCampoMascota(idMascota: number): void {
    this.mascotasService.buscarPorId(idMascota).subscribe(mascota => {
      this.cita.mascotas = mascota;
      this.camposCargados = true; 
    }, error => {
      console.error('Error al obtener la mascota', error);
    });
  }

  setFechaYHoraActual() {
    const ahora = new Date();
    const fecha = ahora.toISOString().substring(0, 10);
    const hora = ahora.toTimeString().substring(0, 5);

    this.cita.fechacita = fecha;
    this.cita.horacita = hora;
  }

  cargarMascotas() {
    this.mascotasService.obtenerListaMascotas().subscribe(data => {
      this.mascotas = data;
    }, error => {
      console.error('Error al obtener los masc', error);
    });
  }

  cargarServicios() {
    this.serviciosService.obtenerListaServicios().subscribe(data => {
      this.servicios = data;
    }, error => {
      console.error('Error al obtener los serve', error);
    });
  }

  cargarClientes() {
    this.clientesService.obtenerListaClientes().subscribe(data => {
      this.clientes = data;
    }, error => {
      console.error('Error al obtener los clientes', error);
    });
  }

  cargarVeterinarios() {
    this.veterinariosService.obtenerListaVeterinarios().subscribe(data => {
      this.veterinarios = data;
    }, error => {
      console.error('Error al obtener los vete', error);
    });
  }

  cargarUsuarios() {
    this.usuariosService.obtenerListaUsuarios().subscribe(data => {
      this.usuarios = data;
    }, error => {
      console.error('Error al obtener los us', error);
    });
  }


  validarYRegistrarCitas(): void {
    if (!this.cita.cliente.idcliente || !this.cita.veterinario.idveterinario || !this.cita.servicios.idservicio ||
      !this.cita.mascotas.idmascota || !this.cita.usuario.idusuario || !this.cita.fechacita ||
      !this.cita.horacita || !this.cita.observaciones) {
      return;
    }
    this.registrarCitas();
  }

  registrarCitas(): void {
    this.citasService.registrarCitas(this.cita).subscribe(response => {

      console.log('cita registrada:', response);
      Swal.fire({
        icon: 'success',  // Cambia el ícono a 'success' para indicar una operación exitosa
        title: '¡Registro Exitoso!',
        text: 'Los datos de la cita han sido registrados correctamente.'
      });
      this.location.back();
      //this.router.navigate(['citas/listar']);
      // Aquí puedes agregar lógica adicional, como redireccionar o mostrar un mensaje de éxito.
    });
  }

  volverAtras(): void {
    this.location.back();
  }

}
