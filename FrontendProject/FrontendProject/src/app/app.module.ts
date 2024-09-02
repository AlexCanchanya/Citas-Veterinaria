import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './seguridad/auth.interceptor';
import { ListaClientesComponent } from './componentes/clientes/lista-clientes/lista-clientes.component';
import { RegistrarClienteComponent } from './componentes/clientes/registrar-cliente/registrar-cliente.component';
import { DetalleClienteComponent } from './componentes/clientes/detalle-cliente/detalle-cliente.component';
import { ListaMascotasComponent } from './componentes/mascotas/lista-mascotas/lista-mascotas.component';
import { RegistrarMascotaComponent } from './componentes/mascotas/registrar-mascota/registrar-mascota.component';
import { EditarClienteComponent } from './componentes/clientes/editar-cliente/editar-cliente.component';
import { DetalleMascotasComponent } from './componentes/mascotas/detalle-mascotas/detalle-mascotas.component';
import { EditarMascotasComponent } from './componentes/mascotas/editar-mascotas/editar-mascotas.component';
import { ListaCitasComponent } from './componentes/citas/lista-citas/lista-citas.component';
import { EditarCitaComponent } from './componentes/citas/editar-cita/editar-cita.component';
import { RegistrarCitaComponent } from './componentes/citas/registrar-cita/registrar-cita.component';
import { DetalleCitaComponent } from './componentes/citas/detalle-cita/detalle-cita.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins


import { CalendarComponent } from './calendar/calendar.component';
import { PaginaNoEncontradaComponent } from './seguridad/pagina-no-encontrada/pagina-no-encontrada.component';
import { ListaUsuariosComponent } from './componentes/usuarios/lista-usuarios/lista-usuarios.component';
import { RegistrarUsuariosComponent } from './componentes/usuarios/registrar-usuarios/registrar-usuarios.component';
import { EditarUsuarioComponent } from './componentes/usuarios/editar-usuario/editar-usuario.component';

import { MenuPrincipalComponent } from './componentes/reportes/menu-principal/menu-principal.component'; // for clickable events


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    ListaClientesComponent,
    RegistrarClienteComponent,
    DetalleClienteComponent,
    ListaMascotasComponent,
    RegistrarMascotaComponent,
    EditarClienteComponent,
    DetalleMascotasComponent,
    EditarMascotasComponent,
    ListaCitasComponent,
    EditarCitaComponent,
    RegistrarCitaComponent,
    DetalleCitaComponent,
    CalendarComponent,
    PaginaNoEncontradaComponent,
    ListaUsuariosComponent,
    RegistrarUsuariosComponent,
    EditarUsuarioComponent,
    
    MenuPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(), // Configurar SweetAlert2
    FullCalendarModule,
    
      
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
