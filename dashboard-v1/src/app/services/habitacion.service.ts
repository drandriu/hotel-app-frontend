import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Habitacion } from "../models/habitacion.model";
import { DynamicSearchDTO } from "../models/DynamicSearchDTO";

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}
  
@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private apiUrl = 'http://localhost:8080/habitaciones';

  constructor(private http: HttpClient) {}

  obtenerHabitaciones(page: number = 0, size: number = 5): Observable<PaginatedResponse<Habitacion>> {
    return this.http.get<PaginatedResponse<Habitacion>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
    // Obtener todas las habitaciones con paginación
   buscarHabitacion(searchRequest: DynamicSearchDTO): Observable<PaginatedResponse<Habitacion>> {
         return this.http.post<PaginatedResponse<Habitacion>>(`${this.apiUrl}/buscar`, searchRequest);
       }

  eliminarHabitacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  registrarHabitacion(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(this.apiUrl, habitacion);
  }

  editarHabitacion(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.apiUrl}/${habitacion.id}`, habitacion);
  }
  
  // Obtener un huésped por su ID usando búsqueda dinámica
        obtenerHabitacionPorIdDinamico(id: string): Observable<Habitacion> {
          const searchRequest: DynamicSearchDTO = {
            listSearchCriteria: [
              { key: 'id', value: id, operation: 'equals' }
            ],
            listOrderCriteria: [],
            page: {
              pageIndex: 0,
              pageSize: 1
            }
          };
          return this.http.post<PaginatedResponse<Habitacion>>(`${this.apiUrl}/buscar`, searchRequest).pipe(
                map(response => response.content[0])  // Obtener el primer (y único) resultado
              );
        }

        
        
}