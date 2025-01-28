import { Component, OnInit } from '@angular/core';
import { DynamicSearchDTO } from 'src/app/models/DynamicSearchDTO';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService, PaginatedResponse } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent implements OnInit {
  hoteles: Hotel[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  size: number = 5;


  filters = {
    id: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: ''
  };
  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.obtenerHoteles();
  }

  obtenerHoteles(): void {
    this.hotelService.obtenerHoteles(this.currentPage, this.size).subscribe(
      (response: PaginatedResponse<Hotel>) => {
        this.hoteles = response.content;
        this.totalPages = response.totalPages;
      },
      error => {
        console.error('Error al obtener los hoteles', error);
      }
    );
  }

  // Método para obtener los hoteles aplicando filtros dinámicos
  obtenerHotelesConFiltros(): void {
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

    this.hotelService.buscarHoteles(searchRequest).subscribe(
      (response: PaginatedResponse<Hotel>) => {
        this.hoteles = response.content;
        this.totalPages = response.totalPages;
      },
      error => {
        console.error('Error al obtener los hoteles con filtros', error);
      }
    );
  }

  // Crea los criterios de búsqueda basados en los filtros
  crearCriteriosBusqueda() {
    const criteria = [];
    
    if (this.filters.id) {
      criteria.push({ key: 'id', value: this.filters.id, operation: 'equals' });
    }
    if (this.filters.nombre) {
      criteria.push({ key: 'nombre', value: this.filters.nombre, operation: 'like' });
    }
    if (this.filters.direccion) {
      criteria.push({ key: 'direccion', value: this.filters.direccion, operation: 'like' });
    }
    if (this.filters.telefono) {
      criteria.push({ key: 'telefono', value: this.filters.telefono, operation: 'like' });
    }
    if (this.filters.email) {
      criteria.push({ key: 'email', value: this.filters.email, operation: 'like' });
    }

    return criteria;
  }

  // Método para realizar una búsqueda cuando se aplican filtros
  buscarHoteles(): void {
    this.currentPage = 0;  // Reiniciar la página al realizar una búsqueda
    this.obtenerHotelesConFiltros(); // Llamamos al nuevo método con filtros dinámicos
  }

  eliminarHotel(id: number): void {
    this.hotelService.eliminarHotel(id).subscribe({
      next: () => {
        this.hoteles = this.hoteles.filter(hotel => hotel.id !== id);
      },
      error: err => {
        console.error('Error al eliminar el hotel', err);
      }
    });
  }

  
  irAPagina(page: number): void {
    if (page >= 0 && page < this.totalPages && !this.hayFiltrosActivos()) {
      this.currentPage = page;
      this.obtenerHoteles();
    }else{
      this.currentPage = page;
      this.obtenerHotelesConFiltros();
    }
  }

  hayFiltrosActivos(): boolean{
    return Object.values(this.filters).some(value => value !== '');
  }
}
