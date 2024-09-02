import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../../servicios/citas.service';
import { Router } from '@angular/router';
declare var $: any; // Importa jQuery
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.css'
})

export class ListaCitasComponent implements OnInit {

  citas: any[] = [];


  constructor(
    private citasService: CitasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.citasService.obtenerlistacitas().subscribe(data => {
      this.citas = data;
      this.initializeDataTable();


    });
  }

  initializeDataTable(): void {
    $(document).ready(() => {
      if ($.fn.DataTable.isDataTable('#citasTable')) {
        $('#citasTable').DataTable().destroy();
      }

      const table = $('#citasTable').DataTable({
        data: this.citas,
        columns: [
          { data: 'idcita' },
          {
            data: null, // Indicamos que no tomará directamente de un campo
            render: function (row: any) {
              return `${row.cliente.nomcliente} ${row.cliente.apecliente}`;
            }
          },
          { data: 'cliente.telfcliente' },
          { data: 'servicios.nombreservicio' },
          { data: 'mascotas.nommascota' },
          { data: 'fechacita' },
          { data: 'horacita' },
          { data: 'estcita' },
          {
            data: null,
            defaultContent: `
            
              <div class="dropdown">
                <!-- Botón del Dropdown -->
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-cog"></i>
                </button>
                <!-- Menú del Dropdown -->
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <button class="dropdown-item d-flex align-items-center edit-btn">
                      <i class="fas fa-edit me-2 text-primary"></i>
                      Editar
                    </button>
                  </li>

                  <li>
                    <button class="dropdown-item d-flex align-items-center details-btn">
                      <i class="fas fa-eye me-2 text-primary"></i>
                      Detalles
                    </button>
                  </li>

                  <li>
                    <button class="dropdown-item d-flex align-items-center complet-btn" >
                      <i class="fas fa-check me-2 text-success"></i>
                      Completar
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item d-flex align-items-center cancel-btn" >
                      <i class="fas fa-trash me-2 text-danger"></i>
                      Anular
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item d-flex align-items-center whatsapp-btn">
                      <i class="fab fa-whatsapp me-2 text-success"></i>
                      WhatsApp
                    </button>
                  </li>
                </ul>
              </div>

          `,

          }
        ],
        createdRow: function (row: Node, data: any[], dataIndex: number) {
          $(row).css('height', '50px');
        },
        language: {
          processing: "Procesando...",
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ registros",
          info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
          infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
          infoFiltered: "(filtrado de un total de _MAX_ registros)",
          infoPostFix: "",
          loadingRecords: "Cargando...",
          zeroRecords: "No se encontraron resultados",
          emptyTable: "Ningún dato disponible en esta tabla",
          paginate: {
            first: '<i class="fas fa-angle-double-left"></i>',
            previous: '<i class="fas fa-angle-left"></i>',
            next: '<i class="fas fa-angle-right"></i>',
            last: '<i class="fas fa-angle-double-right"></i>'
          },
          aria: {
            sortAscending: ": Activar para ordenar la columna de manera ascendente",
            sortDescending: ": Activar para ordenar la columna de manera descendente"
          }
        }

      });

      // Captura el evento click para el botón de eliminar después de cargar la tabla

      // Usar función flecha para mantener el contexto 'this' correcto
      $('#citasTable tbody').on('click', '.dropdown-toggle', (event: any) => {
        var dropdown = new bootstrap.Dropdown($(event.currentTarget)[0]);
        dropdown.show();
      });

      $('#citasTable tbody').on('click', 'button.edit-btn', (event: any) => {
        const data = $('#citasTable').DataTable().row($(event.currentTarget).closest('tr')).data();
        window.location.href = `citas/editar/${data.idcita}`; // Redirige a la página de edición
      });

      $('#citasTable tbody').on('click', 'button.details-btn', (event: any) => {
        const data = $('#citasTable').DataTable().row($(event.currentTarget).closest('tr')).data();
        window.location.href = `citas/detalle/${data.idcita}`; // Redirige a la página de edición
      });

      $('#citasTable tbody').on('click', 'button.complet-btn', (event: any) => {
        const data = table.row($(event.currentTarget).closest('tr')).data();
        this.completarCita(data.idcita, table);
      });

      $('#citasTable tbody').on('click', 'button.cancel-btn', (event: any) => {
        const data = table.row($(event.currentTarget).closest('tr')).data();
        this.anularCita(data.idcita, table);
      });

      $('#citasTable tbody').on('click', 'button.whatsapp-btn', (event: any) => {
        const data = $('#citasTable').DataTable().row($(event.currentTarget).closest('tr')).data();
        this.abrirWhatsApp(
          data.cliente.telfcliente,
          data.cliente.nomcliente,
          data.fechacita,
          data.mascotas.nommascota,
          data.servicios.nombreservicio,
          data.horacita
        );
      });


    });
  }

  completarCita(idcita: number, table: any): void {
    this.citasService.buscarPorId(idcita).subscribe(cita => {
      cita.estcita = 'completado';
      this.citasService.actualizarCitas(cita).subscribe(() => {
        // Actualizar la lista local de citas después de la actualización
        const citaIndex = this.citas.findIndex(c => c.idcita === idcita);
        if (citaIndex !== -1) {
          this.citas[citaIndex].estcita = 'completado';
          this.citas = [...this.citas];
          table.row(citaIndex).data(this.citas[citaIndex]).draw(false);
          // Mostrar mensaje de confirmación usando Swal
          Swal.fire({
            title: '¡Cita Completada!',
            text: 'La cita se ha marcado como completada.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    });
  }

  anularCita(idcita: number, table: any): void {
    this.citasService.buscarPorId(idcita).subscribe(cita => {
      cita.estcita = 'anulado';
      this.citasService.actualizarCitas(cita).subscribe(() => {
        // Actualizar la lista local de citas después de la actualización
        const citaIndex = this.citas.findIndex(c => c.idcita === idcita);
        if (citaIndex !== -1) {
          this.citas[citaIndex].estcita = 'anulado';
          this.citas = [...this.citas];
          table.row(citaIndex).data(this.citas[citaIndex]).draw(false);

          // Mostrar mensaje de confirmación usando Swal
          Swal.fire({
            title: 'Cita Anulada',
            text: 'La cita ha sido anulada correctamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });

        }
      });
    });
  }

  // ================= MENSAJE AL WHATSSAPP =================

  abrirWhatsApp(telfcliente: string, nomcliente: string, fechacita: string, nommascota: string, nomservicio: string, horacita: string): void {
    const message = encodeURIComponent(
      `Hola ${nomcliente},\n\nLe recordamos que el, ${fechacita} a las ${horacita}, su mascota ${nommascota} tiene una cita programada en Pet Center para ${nomservicio}.\n\nHorario de atención: Lunes a Sábado de 9:00 am a 6:00 pm.\n\nNuestra dirección: San Borja.\n\nLe agradeceríamos que asistiera puntualmente. Si tiene alguna pregunta o necesita reprogramar su cita, por favor comuníquese con nosotros a este número.\n\n¡Que tenga un excelente día!\n\nAtentamente,\nPet Center`
    );
    const url = `https://wa.me/${telfcliente}?text=${message}`;
    window.open(url, '_blank');
  }

  registrarCitas(): void {
    this.router.navigate(['citas/registrar']); 
  }



  //=======================================GENERAR PDF ==================================================
  generarPDF() {
    const doc = new jsPDF();

    // Título del PDF
    doc.text('Lista de Citas', 14, 20);

    // Obtener los datos de la tabla
    autoTable(doc, {
      head: [['ID', 'Cliente', 'Telefono', 'Servicio', 'Mascota', 'Fecha', 'Hora', 'Estado']],
      body: this.citas.map(cita => [
        cita.idcita,
        `${cita.cliente.nomcliente} ${cita.cliente.apecliente}`,  // Concatenar nombre y apellido
        cita.cliente.telfcliente,
        cita.servicios.nombreservicio,
        cita.mascotas.nommascota,
        cita.fechacita,
        cita.horacita,
        cita.estcita
      ]),
      startY: 30,
      theme: 'striped',
    });

    // Descargar el PDF
    doc.save('lista_citas.pdf');
  }

  //=======================================GENERAR EXCEL ==================================================

  exportToExcel(): void {
    // Encuentra la tabla por ID o referencia
    const element = document.getElementById('citasTable'); // Asegúrate de que el ID es correcto
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Citas');

    XLSX.writeFile(wb, 'Citas.xlsx');
  }
}
