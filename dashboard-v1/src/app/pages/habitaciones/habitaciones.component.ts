import { Component, OnInit } from '@angular/core';
import { DynamicSearchDTO } from 'src/app/models/DynamicSearchDTO';
import { Habitacion } from 'src/app/models/habitacion.model';
import { HabitacionService, PaginatedResponse } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  size: number = 5;


  filters = {
    id: '',
    numeroHabitacion: '',
    tipo: '',
    precioNoche: '',
    idHotel: ''
  };

  constructor(private habitacionService: HabitacionService) {}

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones(): void {
    this.habitacionService.obtenerHabitaciones(this.currentPage, this.size).subscribe(
      (response: PaginatedResponse<Habitacion>) => {
        this.habitaciones = response.content;
        this.totalPages = response.totalPages;
      },
      error => {
        console.error('Error al obtener las habitaciones', error);
      }
    );
  }

  eliminarHabitacion(id: number): void {
    this.habitacionService.eliminarHabitacion(id).subscribe({
      next: () => {
        this.habitaciones = this.habitaciones.filter(habitacion => habitacion.id !== id);
      },
      error: err => {
        console.error('Error al eliminar la habitación', err);
      }
    });
  }

  obtenerHabitacionesConFiltros(): void {
    const searchRequest: DynamicSearchDTO = {
      listSearchCriteria: this.crearCriteriosBusqueda(),
      listOrderCriteria: [
        {
          sortBy: 'id',
          valuesortOrder: 'ASC'
        }
      ],
      page: {
        pageIndex: this.currentPage,
        pageSize: this.size
      }
    };

    this.habitacionService.buscarHabitacion(searchRequest).subscribe(
      (response: PaginatedResponse<Habitacion>) => {
        this.habitaciones = response.content;
        this.totalPages = response.totalPages;
      },
      error => {
        console.error('Error al obtener las habitaciones con filtros', error);
      }
    );
  }

  crearCriteriosBusqueda() {
    const criteria = [];
    if (this.filters.id) {
      criteria.push({ key: 'id', value: this.filters.id, operation: 'equals' });
    }
    if (this.filters.numeroHabitacion) {
      criteria.push({ key: 'numeroHabitacion', value: this.filters.numeroHabitacion, operation: 'like' });
    }
    if (this.filters.tipo) {
      criteria.push({ key: 'tipo', value: this.filters.tipo, operation: 'like' });
    }
    if (this.filters.precioNoche) {
      criteria.push({ key: 'precioNoche', value: this.filters.precioNoche, operation: 'equals' });
    }
    if (this.filters.idHotel) {
      criteria.push({ key: 'hotel', value: this.filters.idHotel, operation: 'equals' });
    }
    return criteria;
  }

  buscarHabitaciones(): void {
    this.currentPage = 0;
    this.obtenerHabitacionesConFiltros();
  }

  irAPagina(page: number): void {
    if (page >= 0 && page < this.totalPages && !this.hayFiltrosActivos()) {
      this.currentPage = page;
      this.obtenerHabitaciones();
    } else {
      this.currentPage = page;
      this.obtenerHabitacionesConFiltros();
    }
  }

  hayFiltrosActivos(): boolean {
    return Object.values(this.filters).some(value => value !== '');
  }
}