import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Servicio } from "../models/servicio.model";
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
  export class ServicioService {
    private apiUrl = 'http://localhost:8080/servicios';
  
    constructor(private http: HttpClient) {}
  
    obtenerServicios(page: number = 0, size: number = 5): Observable<PaginatedResponse<Servicio>> {
      return this.http.get<PaginatedResponse<Servicio>>(`${this.apiUrl}?page=${page}&size=${size}`);
    }
  
    eliminarServicio(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
    registrarServicio(servicio: Servicio): Observable<Servicio> {
      return this.http.post<Servicio>(this.apiUrl, servicio);
    }
  
    editarServicio(servicio: Servicio): Observable<Servicio> {
      return this.http.put<Servicio>(`${this.apiUrl}/${servicio.id}`, servicio);
    }

// Obtener un servicio por su ID usando búsqueda dinámica
  obtenerServicioPorIdDinamico(id: string): Observable<Servicio> {
    const searchRequest: DynamicSearchDTO = {
      listSearchCriteria: [
        { key: 'id', value: String(id), operation: 'equals' }
      ],
      listOrderCriteria: [
        { sortBy : 'id', valuesortOrder: "ASC"}
      ],
      page: {
        pageIndex: 0,
        pageSize: 1
      }
    };

    return this.http.post<PaginatedResponse<Servicio>>(`${this.apiUrl}/search`, searchRequest).pipe(
      map(response => response.content[0])  // Obtener el primer (y único) resultado
    );
  }

  asignarServicioAHotel(servicioId: number, hotelId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/asignar`, null, {
      params: { servicioId: servicioId.toString(), hotelId: hotelId.toString() }
    });
  }
  buscarServicios(searchRequest: DynamicSearchDTO): Observable<PaginatedResponse<Servicio>> {
    return this.http.post<PaginatedResponse<Servicio>>(`${this.apiUrl}/search`, searchRequest);
  }
  }