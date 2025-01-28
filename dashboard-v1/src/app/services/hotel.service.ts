import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Hotel } from "../models/hotel.model";
import { map, Observable } from "rxjs";
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
  export class HotelService {
    private apiUrl = 'http://localhost:8080/hoteles';
  
    constructor(private http: HttpClient) {}
  
    obtenerHoteles(page: number = 0, size: number = 5): Observable<PaginatedResponse<Hotel>> {
      return this.http.get<PaginatedResponse<Hotel>>(`${this.apiUrl}?page=${page}&size=${size}`);
    }
  
    eliminarHotel(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
    registrarHotel(hotel: Hotel): Observable<Hotel> {
      return this.http.post<Hotel>(this.apiUrl, hotel);
    }
  
    editarHotel(hotel: Hotel): Observable<Hotel> {
      return this.http.put<Hotel>(`${this.apiUrl}/${hotel.id}`, hotel);
    }

    buscarHoteles(searchRequest: DynamicSearchDTO): Observable<PaginatedResponse<Hotel>> {
      return this.http.post<PaginatedResponse<Hotel>>(`${this.apiUrl}/buscar`, searchRequest);
    }


    // Obtener un huésped por su ID usando búsqueda dinámica
      obtenerHotelPorIdDinamico(id: string): Observable<Hotel> {
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
        return this.http.post<PaginatedResponse<Hotel>>(`${this.apiUrl}/buscar`, searchRequest).pipe(
              map(response => response.content[0])  // Obtener el primer (y único) resultado
            );
      }
  }