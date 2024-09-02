import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../servicios/clientes.service';
import { Router } from '@angular/router';
declare var $: any; // Importa jQuery
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css'
})
export class ListaClientesComponent implements OnInit {

  clientes: any[] = [];

  constructor(
    private clientesService: ClientesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.clientesService.obtenerListaClientes().subscribe(data => {
      console.log(data); // Verifica que los datos se estén recibiendo correctamente
      this.clientes = data;
      this.initializeDataTable();
    });
  }

  initializeDataTable(): void {
    $(document).ready(() => {
      if ($.fn.DataTable.isDataTable('#clientesTable')) {
        $('#clientesTable').DataTable().destroy();
      }

      $('#clientesTable').DataTable({
        data: this.clientes,
        columns: [
          { data: 'idcliente' },
          { data: 'nomcliente' },
          { data: 'apecliente' },
          { data: 'dnicliente' },
          { data: 'dircliente' },
          { data: 'emailcliente' },
          { data: 'telfcliente' },
          { data: 'sexcliente' },
          {
            data: null,
            defaultContent: `
            
            <button class="btn btn-light border edit-btn" >
              <i class="fas fa-edit"></i>
            </button>
          
            <button class="btn btn-light border delete-btn">
              <i class="fas fa-trash-alt"></i>
            </button>
              
            <button class="btn btn-light border details-btn" >
              <i class="fas fa-file-alt"></i>
            </button>
          `,

          }
        ],
        createdRow: function (row: Node, data: any[], dataIndex: number) {
          $(row).css('height', '40px');
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
      $('#clientesTable tbody').on('click', 'button.delete-btn', (event: any) => {
        const data = $('#clientesTable').DataTable().row($(event.currentTarget).closest('tr')).data();
        this.eliminarCliente(data.idcliente); // Llama a la función Angular eliminarCliente
      });

      $('#clientesTable tbody').on('click', 'button.edit-btn', (event: any) => {
        const data = $('#clientesTable').DataTable().row($(event.currentTarget).closest('tr')).data();
        window.location.href = `clientes/editar/${data.idcliente}`; // Redirige a la página de edición
      });

      $('#clientesTable tbody').on('click', 'button.details-btn', (event: any) => {
        const data = $('#clientesTable').DataTable().row($(event.currentTarget).closest('tr')).data();
        window.location.href = `clientes/detalle/${data.idcliente}`; // Redirige a la página de edición
      });

    });
  }

  registrarCliente(): void {
    this.router.navigate(['/clientes/registrar']);
  }

  eliminarCliente(idcliente: number): void {
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
        this.clientesService.eliminarCliente(idcliente).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado.',
            'success'
          );
          this.ngOnInit(); // Vuelve a cargar la lista de clientes
        }, error => {
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar el cliente.',
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
    doc.text('Lista de Clientes', 14, 20);

    // Obtener los datos de la tabla
    autoTable(doc, {
      head: [['ID', 'Nombre', 'Apellido', 'DNI', 'Dirección', 'Email', 'Teléfono', 'Sexo']],
      body: this.clientes.map(cliente => [
        cliente.idcliente,
        cliente.nomcliente,
        cliente.apecliente,
        cliente.dnicliente,
        cliente.dircliente,
        cliente.emailcliente,
        cliente.telfcliente,
        cliente.sexcliente
      ]),
      startY: 30,
      theme: 'striped',
    });

    // Descargar el PDF
    doc.save('lista_clientes.pdf');
  }

  exportToExcel(): void {
    const tableElement = document.getElementById('clientesTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes');
    XLSX.writeFile(wb, 'Clientes.xlsx');
  }
  
}
