import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitasService } from '../servicios/citas.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es'; 

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    events: [],
    editable: true,
    selectable: true,
    locale: esLocale, // Aplica el idioma español

  };

  constructor(private citasService: CitasService, private router: Router) { }

  ngOnInit() {
    this.citasService.obtenerlistacitas().subscribe(
      (citas: any[]) => {
        const events = citas.map(cita => {
          const formattedTime = cita.horacita.substring(0, 5);

          return {
            id: cita.idcita,
            title: `${formattedTime} - ${cita.observaciones}`,
            date: cita.fechacita,
          };
        });

        this.calendarOptions = {
          initialView: 'dayGridMonth',
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
          events: events,
          editable: true,
          selectable: true,
          eventClick: this.handleEventClick.bind(this),
        };
      },
      (error) => {
        console.error('Error al recibir citas:', error);
      }
    );
  }

  handleEventClick(arg: any) {
    const idcita = arg.event.id;
    try {
      this.router.navigate([`citas/detalle/${idcita}`]);
    } catch (error) {
      console.error('Error al redirigir a citas/detalle:', error);
    }
  }
}
