import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MascotasService } from '../../../servicios/mascotas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any; // Importa jQuery

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrl: './lista-mascotas.component.css'
})
export class ListaMascotasComponent implements OnInit {

  mascotas: any[] = [];

  constructor(
    private mascotasServicio: MascotasService,
    private router: Router) { }

  ngOnInit(): void {
    this.mascotasServicio.obtenerListaMascotas().subscribe(data => {
      this.mascotas = data;
      this.initializeDataTable();
    });
  }

  initializeDataTable(): void {
    $(document).ready(() => {
      if ($.fn.DataTable.isDataTable('#mascotasTable')) {
        $('#mascotasTable').DataTable().destroy();
      }

      $('#mascotasTable').DataTable({
        data: this.mascotas,
        columns: [
          { data: 'idmascota' },
          { data: 'nommascota' },
          {
            data: null, // Indicamos que no tomará directamente de un campo
            render: function (row: any) {
              return `${row.cliente.nomcliente} ${row.cliente.apecliente}`;
            }
          },
          { data: 'espmascota' },
          { data: 'razamascota' },
          { data: 'edadmascota' },
          { data: 'pesomascota' },
          { data: 'sexomascota' },
          { data: 'castrado' },
          {
            data: null,
            defaultContent: `
            
            <button class="btn btn-light border edit-btn" >
            <i class="fas fa-edit"></i>
          </button>
          
          <button class="btn btn-light border delete-btn" >
            <i class="fas fa-trash-alt"></i>
          </button>
          
          <button class="btn btn-light border details-btn" >
            <i class="fas fa-file-alt"></i>
          </button>
          
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
      $('#mascotasTable tbody').on('click', 'button.delete-btn', (event: any) => {
        const data = $('#mascotasTable').DataTable().row($(event.currentTarget).closest('tr')).data();
        this.eliminarMascota(data.idmascota); // Llama a la función Angular eliminarCliente
      });

      $('#mascotasTable tbody').on('click', 'button.edit-btn', (event: any) => {
        const data = $('#mascotasTable').DataTable().row($(event.currentTarget).closest('tr')).data();
        window.location.href = `mascotas/editar/${data.idmascota}`; // Redirige a la página de edición
      });

      $('#mascotasTable tbody').on('click', 'button.details-btn', (event: any) => {
        const data = $('#mascotasTable').DataTable().row($(event.currentTarget).closest('tr')).data();
        window.location.href = `mascotas/detalles/${data.idmascota}`; // Redirige a la página de edición
      });


    });
  }

  registrarMascota(): void {
    this.router.navigate(['mascotas/registrar']);
  }

  eliminarMascota(idmascota: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mascotasServicio.eliminarMascota(idmascota).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'La mascota ha sido eliminado.',
            'success'
          );
          this.ngOnInit(); // Vuelve a cargar la lista de clientes
        }, error => {
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar el paciente.',
            'error'
          );
        });
      }
    });
  }


  //=======================================GENERAR PDF ==================================================
  generarPDF() {
    const doc = new jsPDF();

    // Título del PDF
    doc.text('Lista de Pacientes', 14, 20);

    // Obtener los datos de la tabla
    autoTable(doc, {
      head: [['ID', 'Nombre', 'Dueño', 'Especie', 'Raza', 'Edad', 'Peso', 'Sexo', 'Castrado?']],
      body: this.mascotas.map(mascota => [
        mascota.idmascota,
        mascota.nommascota,
        `${mascota.cliente.nomcliente} ${mascota.cliente.apecliente}`,  // Concatenar nombre y apellido
        mascota.espmascota,
        mascota.razamascota,
        mascota.edadmascota,
        mascota.pesomascota,
        mascota.sexomascota,
        mascota.castrado
      ]),
      startY: 30,
      theme: 'striped',
    });

    // Descargar el PDF
    doc.save('lista_mascotas.pdf');
  }

  exportToExcel(): void {
    // Encuentra la tabla por ID o referencia
    const element = document.getElementById('mascotasTable'); // Asegúrate de que el ID es correcto
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mascotas');

    XLSX.writeFile(wb, 'Mascotas.xlsx');
  }

}



