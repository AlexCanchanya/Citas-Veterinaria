import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from '../../../servicios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrl: './registrar-usuarios.component.css'
})

export class RegistrarUsuariosComponent {

  usuario: any = {
    idusuario: 0,
    nomusuario: '',
    apeusuario: '',
    nickusuario: '',
    passusuario: '',
    rol: '',
    estado: true

  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private location: Location,
  ) { }

  validarYRegistrarUsuario(): void {
    if (!this.usuario.nomusuario || !this.usuario.apeusuario || !this.usuario.nickusuario ||
      !this.usuario.passusuario || !this.usuario.rol) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Por favor complete todos los campos.'
        });
      return;
    }
    this.registrarUsuario();
  }

  registrarUsuario(): void {
    this.usuarioService.registrarUsuario(this.usuario).subscribe(response => {
      console.log('Usuario registrado:', response);
      Swal.fire({
        icon: 'success',  // Cambia el ícono a 'success' para indicar una operación exitosa
        title: '¡Registro Exitoso!',
        text: 'Los datos del Usuario han sido registrados correctamente.'
      });
      this.router.navigate(['usuarios/listar']);
    });
  }

  volverAtras(): void {
    this.location.back();
    //this.router.navigate(['clientes/listar']);
  }
}