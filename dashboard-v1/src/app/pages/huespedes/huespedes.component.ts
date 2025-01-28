import { Component, OnInit } from '@angular/core';
import { HuespedService, PaginatedResponse } from '../../services/huesped.service';
import { Huesped } from '../../models/huesped.model';
import { DynamicSearchDTO } from 'src/app/models/DynamicSearchDTO';

@Component({
  selector: 'app-huespedes',
  templateUrl: './huespedes.component.html',
  styleUrls: ['./huespedes.component.css']
})
export class HuespedesComponent implements OnInit {
  huespedes: Huesped[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  totalElements: number = 0;
  size: number = 5;

  filters = {
    id: '',
    nombre: '',
    apellido: '',
    dniPasaporte: '',
    fechaCheckIn: '',
    fechaCheckOut: ''
  };

  constructor(private huespedService: HuespedService) {}

  ngOnInit(): void {
    this.obtenerHuespedes();
  }

  obtenerHuespedes(): void {
    this.huespedService.obtenerHuespedes(this.currentPage, this.size).subscribe(
      (response: PaginatedResponse<Huesped>) => {
        this.huespedes = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      },
      error => {
        console.error('Error al obtener los huéspedes', error);
      }
    );
  }

  // Llamada a la función de eliminación
  eliminarHuesped(id: number): void {

    this.huespedService.eliminarHuesped(id).subscribe({
      next: () => {
        // Eliminar el huesped de la lista localmente después de la eliminación en el backend
        this.huespedes = this.huespedes.filter(huesped => huesped.idHuesped !== id);
      },
      error: (err) => {
        console.error("Error al eliminar el huésped", err);
      }
    });
  }

    // Método para obtener los huéspedes aplicando filtros dinámicos
    obtenerHuespedesConFiltros(): void {
      const searchRequest: DynamicSearchDTO = {
        listSearchCriteria: this.crearCriteriosBusqueda(),
        listOrderCriteria: [
          {
            sortBy: 'idHuesped',  // Ordenamiento por ID
            valuesortOrder: 'ASC'
          }
        ],
        page: {
          pageIndex: this.currentPage,
          pageSize: this.size
        }
      };
  
      this.huespedService.buscarHuespedes(searchRequest).subscribe(
        (response: PaginatedResponse<Huesped>) => {
          this.huespedes = response.content;
          this.totalPages = response.totalPages;
        },
        error => {
          console.error('Error al obtener los huéspedes con filtros', error);
        }
      );
    }
  
    // Crea los criterios de búsqueda basados en los filtros
    crearCriteriosBusqueda() {
      const criteria = [];
      if(this.filters.id){
        criteria.push({key: 'id', value: this.filters.id, operation: 'equals'});
      }
      if (this.filters.nombre) {
        criteria.push({ key: 'nombre', value: this.filters.nombre, operation: 'like' });
      }
      if (this.filters.apellido) {
        criteria.push({ key: 'apellido', value: this.filters.apellido, operation: 'like' });
      }
      if (this.filters.dniPasaporte) {
        criteria.push({ key: 'dniPasaporte', value: this.filters.dniPasaporte, operation: 'like' });
      }
      if (this.filters.fechaCheckIn) {
        criteria.push({ key: 'fechaCheckIn', value: this.filters.fechaCheckIn, operation: 'equals' });
      }
      if (this.filters.fechaCheckOut) {
        criteria.push({ key: 'fechaCheckOut', value: this.filters.fechaCheckOut, operation: 'equals' });
      }
      return criteria;
    }
  
    // Método para realizar una búsqueda cuando se aplican filtros
    buscarHuespedes(): void {
      console.log(this.filters.fechaCheckIn);
      console.log(this.filters.fechaCheckOut);
      this.currentPage = 0;  // Reiniciar la página al realizar una búsqueda
      this.obtenerHuespedesConFiltros(); // Llamamos al nuevo método con filtros dinámicos
    }

    irAPagina(page: number): void {
      if (page >= 0 && page < this.totalPages && !this.hayFiltrosActivos()) {
        this.currentPage = page;
        this.obtenerHuespedes();
      } else {
        this.currentPage = page;
        this.obtenerHuespedesConFiltros();
      }
    }
  
    // Método para verificar si hay filtros activos
    hayFiltrosActivos(): boolean {
      return Object.values(this.filters).some(value => value !== '');
    }
}