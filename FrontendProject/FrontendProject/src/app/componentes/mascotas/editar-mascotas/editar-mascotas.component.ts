import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from '../../../servicios/mascotas.service';

import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-mascotas',
  templateUrl: './editar-mascotas.component.html',
  styleUrl: './editar-mascotas.component.css'
})

export class EditarMascotasComponent implements OnInit {

  id: number;
  mascota: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotaService: MascotasService,
    private location: Location,

  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.mascotaService.buscarPorId(id).subscribe(
        data => {
          this.mascota = data;
        },
        error => {
          console.error('Error al obtener el mascota', error);
        }
      );
    } else {
      console.error('ID de mascota no encontrado en la ruta');
    }
  }

  actualizarMascota(): void {
    this.mascotaService.actualizarMascota(this.mascota).subscribe(
      data => {
        console.log('Datos actualizados', data);
        Swal.fire({
          icon: 'success',  // Ícono que indica éxito
          title: '¡Modificación Exitosa!',
          text: 'Los datos del cliente han sido modificados correctamente.'
        });
        this.location.back();
      },
      error => {
        console.error('Error al actualizar mascota', error);
      }
    );
  }

  volverAtras(): void {
    this.location.back();
  }
}
