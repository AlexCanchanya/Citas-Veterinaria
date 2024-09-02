import { Component } from '@angular/core';
import { CitasService } from '../../../servicios/citas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../../servicios/clientes.service';
import { VeterinariosService } from '../../../servicios/veterinarios.service';
import { UsuarioService } from '../../../servicios/usuario.service';
import { MascotasService } from '../../../servicios/mascotas.service';
import { ServiciosService } from '../../../servicios/servicios.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrl: './editar-cita.component.css'
})

export class EditarCitaComponent {

  id: number;
  cita: any;

  clientes: any[] = [];
  veterinarios: any[] = [];
  usuarios: any[] = [];
  servicios: any[] = [];
  mascotas: any[] = [];

  constructor(private citasService: CitasService,
    private router: Router,
    private clientesService: ClientesService,
    private veterinariosService: VeterinariosService,
    private usuariosService: UsuarioService,
    private mascotasService: MascotasService,
    private serviciosService: ServiciosService,
    private route: ActivatedRoute,
    private location: Location



  ) { }

  
  ngOnInit(): void {
    this.cargarClientes();
    this.cargarVeterinarios();
    this.cargarUsuarios();
    this.cargarMascotas();
    this.cargarServicios();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.citasService.buscarPorId(id).subscribe(
        data => {
          this.cita = data;
        },
        error => {
          console.error('Error al obtener la cita', error);
        }
      );
    } else {
      console.error('ID de la cita no encontrado en la ruta');
    }
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

  actualizarCitas(): void {
    this.citasService.actualizarCitas(this.cita).subscribe(
      data => {
        console.log('Datos actualizados', data);
        Swal.fire({
          icon: 'success',  // Cambia el ícono a 'success' para indicar una operación exitosa
          title: '¡Modificación Exitosa!',
          text: 'Los datos de la cita han sido modificadas correctamente.'
        });
        this.router.navigate(['citas/listar']);
      },
      error => {
        console.error('Error al actualizar datos de la cita', error);
      }
    );
  }

  volverAtras(): void {
    this.location.back();
  }

}
