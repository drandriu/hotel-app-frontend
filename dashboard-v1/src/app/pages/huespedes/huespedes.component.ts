import { Component, OnInit } from '@angular/core';
import { HuespedService, PaginatedResponse } from '../../services/huesped.service';
import { Huesped } from '../../models/huesped.model';

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


  irAPagina(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.obtenerHuespedes();  // Vuelve a obtener los huéspedes para la página seleccionada
    }
  }
}