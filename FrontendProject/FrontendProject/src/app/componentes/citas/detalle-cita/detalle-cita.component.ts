import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from '../../../servicios/citas.service';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrl: './detalle-cita.component.css'
})

export class DetalleCitaComponent implements OnInit  {

  cita: any = {}

  constructor(private route: ActivatedRoute,
    private citasService: CitasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.citasService.buscarPorId(id).subscribe(cita => {
    this.cita = cita; 
    });
  }
}
