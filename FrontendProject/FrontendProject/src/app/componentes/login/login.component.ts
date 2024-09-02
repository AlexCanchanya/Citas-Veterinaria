import { Component } from '@angular/core';
import { Credentials } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  creds : Credentials = {
    nickusuario:'',
    passusuario: ''
  };

  errorMessage: string = ''; // Propiedad para el mensaje de error

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ){}

  

  login(form: NgForm) {
    console.log('form value', form.value);
    this.usuarioService.login(this.creds)
        .subscribe(response => {
            // Después de iniciar sesión, buscar el usuario por su nickusuario
            this.usuarioService.obtenerUsuarioPorNick(this.creds.nickusuario)
                .subscribe(usuario => {
                    const rol = usuario.rol;
                    const idusuario = usuario.idusuario; // Capturar el idusuario

                    console.log('Rol del usuario:', rol);
                    console.log('ID del usuario:', idusuario);

                    // Aquí puedes guardar el rol en localStorage o usarlo según tu necesidad
                    localStorage.setItem('rol', rol);
                    localStorage.setItem('idusuario', idusuario.toString()); // Asegúrate de convertir idusuario a string
                    this.router.navigate(['/'])
                    .then(() => {
                      // Forzar la actualización completa de la página
                      window.location.reload();
                  });
                });
        }, error => {
            this.errorMessage = 'Credenciales inválidas. Por favor, inténtelo de nuevo.';
        });
}
}