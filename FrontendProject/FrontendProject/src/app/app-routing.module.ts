import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './seguridad/auth.guard';
import { ListaClientesComponent } from './componentes/clientes/lista-clientes/lista-clientes.component';
import { RegistrarClienteComponent } from './componentes/clientes/registrar-cliente/registrar-cliente.component';
import { ListaMascotasComponent } from './componentes/mascotas/lista-mascotas/lista-mascotas.component';
import { RegistrarMascotaComponent } from './componentes/mascotas/registrar-mascota/registrar-mascota.component';
import { DetalleClienteComponent } from './componentes/clientes/detalle-cliente/detalle-cliente.component';
import { EditarClienteComponent } from './componentes/clientes/editar-cliente/editar-cliente.component';
import { DetalleMascotasComponent } from './componentes/mascotas/detalle-mascotas/detalle-mascotas.component';
import { EditarMascotasComponent } from './componentes/mascotas/editar-mascotas/editar-mascotas.component';
import { ListaCitasComponent } from './componentes/citas/lista-citas/lista-citas.component';
import { RegistrarCitaComponent } from './componentes/citas/registrar-cita/registrar-cita.component';
import { EditarCitaComponent } from './componentes/citas/editar-cita/editar-cita.component';
import { DetalleCitaComponent } from './componentes/citas/detalle-cita/detalle-cita.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthRedirectGuard } from './seguridad/auth-redirect.guard';
import { PaginaNoEncontradaComponent } from './seguridad/pagina-no-encontrada/pagina-no-encontrada.component';
import { ListaUsuariosComponent } from './componentes/usuarios/lista-usuarios/lista-usuarios.component';
import { RegistrarUsuariosComponent } from './componentes/usuarios/registrar-usuarios/registrar-usuarios.component';
import { EditarUsuarioComponent } from './componentes/usuarios/editar-usuario/editar-usuario.component';
import { MenuPrincipalComponent } from './componentes/reportes/menu-principal/menu-principal.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard],
    children: [

      { path: 'clientes', component: ListaClientesComponent, canActivate: [AuthGuard] },
      { path: 'clientes/registrar', component: RegistrarClienteComponent, canActivate: [AuthGuard] },
      { path: 'clientes/detalle/:id', component: DetalleClienteComponent, canActivate: [AuthGuard] },
      { path: 'clientes/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard] },

      { path: 'mascotas/listar', component: ListaMascotasComponent, canActivate: [AuthGuard] },
      { path: 'mascotas/registrar', component: RegistrarMascotaComponent, canActivate: [AuthGuard] },
      { path: 'mascotas/detalles/:id', component: DetalleMascotasComponent, canActivate: [AuthGuard] },
      { path: 'mascotas/editar/:id', component: EditarMascotasComponent, canActivate: [AuthGuard] },

      { path: 'citas/listar', component: ListaCitasComponent, canActivate: [AuthGuard] },
      { path: 'citas/registrar', component: RegistrarCitaComponent, canActivate: [AuthGuard] },
      { path: 'citas/editar/:id', component: EditarCitaComponent, canActivate: [AuthGuard] },
      { path: 'citas/detalle/:id', component: DetalleCitaComponent, canActivate: [AuthGuard] },

      { path: 'usuarios/listar', component: ListaUsuariosComponent, canActivate: [AuthGuard] },
      { path: 'usuarios/registrar', component: RegistrarUsuariosComponent, canActivate: [AuthGuard] },
      { path: 'usuarios/editar/:id', component: EditarUsuarioComponent,canActivate: [AuthGuard]}, 

      { path: 'calendario', component: CalendarComponent, canActivate: [AuthGuard] },

      

      { path: 'menu-reportes', component: MenuPrincipalComponent, canActivate: [AuthGuard] },
    ]
  },

  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: '404', component: PaginaNoEncontradaComponent },   // Ruta para la página de error 404, cuando la ruta solicitada no existe
  { path: '**', redirectTo: '404' }   // Ruta  para capturar todas las rutas no definidas y redirigirlas a la página 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
