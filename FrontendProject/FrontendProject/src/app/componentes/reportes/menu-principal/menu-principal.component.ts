import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from '../../../servicios/citas.service';
import { Chart, registerables } from 'chart.js';
import { MascotasService } from '../../../servicios/mascotas.service';
import { ClientesService } from '../../../servicios/clientes.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent implements OnInit {

  cantidadMascotas: number;
  cantidadClientes: number;

  constructor(
    private citasService: CitasService,
    private router: Router,
    private clientesService: ClientesService,
    private mascotasService: MascotasService
  ) { }

  ngOnInit(): void {

    this.obtenerCantidadDeMascotas();
    this.obtenerCantidadDeClientes();
    
    // Registrar todos los componentes necesarios de Chart.js
    Chart.register(...registerables);

    // Gráfico de citas
    this.citasService.obtenerCitasPorMesEstado().subscribe(dataCitas => {
      const mesesCitas = this.getMeses();
      const completadas = this.filtrarPorEstado(dataCitas, 'completado');
      const anuladas = this.filtrarPorEstado(dataCitas, 'anulado');

      this.createCitasAreaChart(mesesCitas, completadas, anuladas);
    });

    // Gráfico de Mascotas
    this.mascotasService.obtenerMascotasPorMes().subscribe(data => {
      const meses = this.getMeses();
      const totalMascotas = this.mapearDatos(data);

      // Calcula el valor máximo para ajustar el eje Y
      const maxTotalMascotas = Math.max(...totalMascotas);
      const maxYValue = maxTotalMascotas + 2; // Ajusta el valor máximo del eje Y con un margen adicional

      this.createMascotasChart(meses, totalMascotas, maxYValue);
    });
  }

  
  mapearDatos(data: any[]): number[] {
    const resultado = Array(12).fill(0); // Inicializa un array de 12 elementos con 0

    data.forEach(item => {
      resultado[item.mes - 1] = item.totalMascotas;
    });

    return resultado;
  }

  getMeses(): string[] {
    return ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  }

  filtrarPorEstado(data: any[], estado: string): number[] {
    const resultado = Array(12).fill(0); // Inicializa un array de 12 elementos con 0

    data.forEach(item => {
      if (item.estcita === estado) {
        resultado[item.mes - 1] = item.totalCitas;
      }
    });

    return resultado;
  }

  createCitasAreaChart(meses: string[], completadas: number[], anuladas: number[]): void {
    const ctx = document.getElementById('citasChart') as HTMLCanvasElement;
    const maxCompletadas = Math.max(...completadas);
    const maxAnuladas = Math.max(...anuladas);
    const maxYValue = Math.max(maxCompletadas, maxAnuladas) + 2; // Ajuste del valor máximo del eje Y
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Citas Completadas',
            data: completadas,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: '#fff'
          },
          {
            label: 'Citas Anuladas',
            data: anuladas,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 3,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: 'rgba(255, 159, 64, 1)',
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: '#fff'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: maxYValue,
            grid: {
              color: 'rgba(200, 200, 200, 0.3)',
            },
            ticks: {
              stepSize: 1,
              color: '#666',
              font: {
                size: 14,
                family: 'Arial'
              }
            }
          },
          x: {
            grid: {
              color: 'rgba(200, 200, 200, 0.3)',
            },
            ticks: {
              color: '#666',
              font: {
                size: 14,
                family: 'Arial'
              }
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 16,
              family: 'Arial',
              weight: 'bold'
            },
            bodyFont: {
              size: 14,
              family: 'Arial'
            },
            borderColor: '#fff',
            borderWidth: 1,
            cornerRadius: 4,
            caretSize: 6,
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          },
          legend: {
            labels: {
              font: {
                size: 14,
                family: 'Arial',
                weight: 'bold'
              },
              color: '#333'
            }
          }
        }
      }
    });
  }

  createMascotasChart(meses: string[], totalMascotas: number[], maxYValue: number): void {
    const ctx = document.getElementById('mascotasChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [{
          label: 'Pacientes',
          data: totalMascotas,
          backgroundColor: '#007bff',  // Azul intenso para un estilo más robusto
          borderColor: '#0056b3',
          borderWidth: 2,
          borderRadius: 4, // Bordes ligeramente redondeados
          barThickness: 30,  // Barras más anchas
          maxBarThickness: 30,  // Establece un grosor máximo mayor para las barras
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false, // Oculta la leyenda para un diseño más compacto
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo negro semitransparente
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            bodyColor: '#ffffff' // Color del texto blanco
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: maxYValue,  // Ajusta dinámicamente el valor máximo del eje Y
            ticks: {
              stepSize: 1,
              color: '#6c757d', // Color gris suave para los ticks
              font: {
                size: 14
              }
            },
            grid: {
              display: true,
              color: '#e9ecef'  // Color gris claro para las líneas de la cuadrícula
            }
          },
          x: {
            ticks: {
              color: '#6c757d', // Color gris suave para los ticks
              font: {
                size: 14
              }
            },
            grid: {
              display: false  // Elimina las líneas de la cuadrícula del eje X
            }
          }
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        responsive: true,
        maintainAspectRatio: false // Para que el gráfico se ajuste mejor al contenedor
      }
    });
  }


  irAgraficosCitas() {
    this.router.navigate(['/graficos/citas']);
  }

  irAgraficosPacientes() {
    this.router.navigate(['/graficos/pacientes']);
  }

  irAListadoMascotas() {
    this.router.navigate(['/mascotas/listar']);
  }

  irAListadoClientes() {
    this.router.navigate(['/clientes/listar']);
  }

  obtenerCantidadDeMascotas() {
    this.mascotasService.obtenerListaMascotas().subscribe(mascotas => {
      this.cantidadMascotas = mascotas.length;
      console.log(`Cantidad de mascotas: ${this.cantidadMascotas}`);
    });
  }

  obtenerCantidadDeClientes() {
    this.clientesService.obtenerListaClientes().subscribe(clientes => {
      this.cantidadClientes = clientes.length;
      console.log(`Cantidad de clientes: ${this.cantidadClientes}`);
    });
  }
}
