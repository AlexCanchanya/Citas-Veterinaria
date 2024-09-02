import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {

  id: number;
  usuario: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.usuarioService.buscarPorId(id).subscribe(
        data => {
          this.usuario = data;
        },
        error => {
          console.error('Error al obtener el usuario', error);
        }
      );
    } else {
      console.error('ID de usuario no encontrado en la ruta');
    }
  }


  actualizarUsuario(): void {
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      data => {
        console.log('Datos actualizados', data);
        Swal.fire({
          icon: 'success',  // Ícono que indica éxito
          title: '¡Modificación Exitosa!',
          text: 'Los datos del usuario han sido modificados correctamente.'
        });

        this.router.navigate([`usuarios/listar`]);
      },
      error => {
        console.error('Error al actualizar usuario', error);
      }
    );
  }

  volverAtras(): void {
    this.location.back();
  }


}

