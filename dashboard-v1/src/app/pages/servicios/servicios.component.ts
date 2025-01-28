import { Component, OnInit } from '@angular/core';
import { DynamicSearchDTO } from 'src/app/models/DynamicSearchDTO';
import { Servicio } from 'src/app/models/servicio.model';
import { PaginatedResponse } from 'src/app/services/huesped.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  size: number = 5;


  filters = {
    id: '',
    nombre: '',
    descripcion: ''
  };
  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios(): void {
    this.servicioService.obtenerServicios(this.currentPage, this.size).subscribe(
      (response: PaginatedResponse<Servicio>) => {
        this.servicios = response.content;
        this.totalPages = response.totalPages;
      },
      error => {
        console.error('Error al obtener los servicios', error);
      }
    );
  }

  eliminarServicio(id: number): void {
    this.servicioService.eliminarServicio(id).subscribe({
      next: () => {
        this.servicios = this.servicios.filter(servicio => servicio.id !== id);
      },
      error: err => {
        console.error('Error al eliminar el servicio', err);
      }
    });
  }

  irAPagina(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
  
      if (this.hayFiltrosActivos()) {
        this.obtenerServiciosConFiltros();
      } else {
        this.obtenerServicios();
      }
    }
  }


  obtenerServiciosConFiltros(): void {
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
  
    this.servicioService.buscarServicios(searchRequest).subscribe(
      (response: PaginatedResponse<Servicio>) => {
        this.servicios = response.content;
        this.totalPages = response.totalPages;
      },
      error => {
        console.error('Error al obtener los servicios con filtros', error);
      }
    );
  }
  hayFiltrosActivos(): boolean {
    return Object.values(this.filters).some(value => value !== '');
  }
  
  crearCriteriosBusqueda() {
    const criteria = [];
  
    if (this.filters.id) {
      criteria.push({ key: 'id', value: this.filters.id, operation: 'equals' });
    }
    if (this.filters.nombre) {
      criteria.push({ key: 'nombre', value: this.filters.nombre, operation: 'like' });
    }
    if (this.filters.descripcion) {
      criteria.push({ key: 'descripcion', value: this.filters.descripcion, operation: 'like' });
    }
  
    return criteria;
  }
  
  buscarServicios(): void {
    this.currentPage = 0;  // Reiniciar la página al realizar una búsqueda
    this.obtenerServiciosConFiltros();
  }
}
