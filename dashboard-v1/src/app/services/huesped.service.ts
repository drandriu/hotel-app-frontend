import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Huesped } from '../models/huesped.model';

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
}