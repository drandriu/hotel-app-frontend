import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Huesped } from '../models/huesped.model';
import { DynamicSearchDTO } from '../models/DynamicSearchDTO';

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'  // Asegúrate de que 'root' esté ahí
})
export class HuespedService {
  private apiUrl = 'http://localhost:8080/huespedes';  // URL de tu backend

  constructor(private http: HttpClient) {}

  obtenerHuespedes(page: number = 0, size: number = 5): Observable<PaginatedResponse<Huesped>> {
    return this.http.get<PaginatedResponse<Huesped>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }


   // Nueva función para eliminar un huésped
   eliminarHuesped(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  registrarHuesped(huesped: Huesped): Observable<Huesped> {
    return this.http.post<Huesped>(this.apiUrl, huesped);
  }

  editarHuesped(huesped: Huesped): Observable<Huesped> {
    return this.http.put<Huesped>(`${this.apiUrl}/${huesped.idHuesped}`, huesped);
  }

  // Obtener un huésped por su ID usando búsqueda dinámica
  obtenerHuespedPorIdDinamico(id: string): Observable<Huesped> {
    const searchRequest: DynamicSearchDTO = {
      listSearchCriteria: [
        { key: 'idHuesped', value: id, operation: 'equals' }
      ],
      listOrderCriteria: [],
      page: {
        pageIndex: 0,
        pageSize: 1
      }
    };

    return this.http.post<PaginatedResponse<Huesped>>(`${this.apiUrl}/buscar`, searchRequest).pipe(
      map(response => response.content[0])  // Obtener el primer (y único) resultado
    );
  }

  // Método para buscar huéspedes con filtros dinámicos
  buscarHuespedes(searchRequest: DynamicSearchDTO): Observable<PaginatedResponse<Huesped>> {
    return this.http.post<PaginatedResponse<Huesped>>(`${this.apiUrl}/buscar`, searchRequest);
  }


}