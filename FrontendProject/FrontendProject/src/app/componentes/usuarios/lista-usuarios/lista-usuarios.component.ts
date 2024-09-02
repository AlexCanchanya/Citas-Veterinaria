import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../servicios/usuario.service';
declare var $: any; // Importa jQuery
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})

export class ListaUsuariosComponent implements OnInit {

  usuarios: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.obtenerListaUsuarios().subscribe(data => {
      this.usuarios = data;
      this.initializeDataTable();

    });
  }

  initializeDataTable(): void {
    $(document).ready(() => {
      if ($.fn.DataTable.isDataTable('#usuariosTable')) {
        $('#usuariosTable').DataTable().destroy();
      }

      $('#usuariosTable').DataTable({
        data: this.usuarios,
        columns: [
          { data: 'idusuario' },
          { data: 'nomusuario' },
          { data: 'apeusuario' },
          { data: 'nickusuario' },
          { 
            data: 'passusuario',
            render: function(data:any, type:any, row:any) {
              return '*'.repeat(data.length);  // Genera tantos asteriscos como la longitud de la contraseña
            }
          },          
          { data: 'rol' },              
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
    });
  }

  registrarUsuario(): void {
    this.router.navigate(['/usuarios/registrar']);
  }

  //=======================================GENERAR PDF ==================================================
  generarPDF() {
    const doc = new jsPDF();

    // Título del PDF
    doc.text('Lista de Usuarios', 14, 20);

    // Obtener los datos de la tabla
    autoTable(doc, {
      head: [['ID', 'Nombre', 'Apellido', 'Username', 'Contraseña', 'Rol']],
      body: this.usuarios.map(usuario => [
        usuario.idusuario,
        usuario.nomusuario,
        usuario.apeusuario,
        usuario.nickusuario,
        usuario.passusuario,
        usuario.rol
      ]),
      startY: 30,
      theme: 'striped',
    });

    // Descargar el PDF
    doc.save('lista_usuarios.pdf');
  }

  exportToExcel(): void {
    const tableElement = document.getElementById('usuariosTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'Usuarios.xlsx');
  }
  





}

