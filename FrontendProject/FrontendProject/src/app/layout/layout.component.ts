import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(
    
    private location: Location,
    public router: Router,
    private usuarioService: UsuarioService
  ){}

  verClientesMenu = false;
  verMascotasMenu = false;

  goBack(): void {
    this.location.back();
  }
 
  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
 

  toggleClientesMenu() {
    this.verClientesMenu = !this.verClientesMenu;
  }

  toggleMascotasMenu() {
    this.verMascotasMenu = !this.verMascotasMenu;
  }

}
