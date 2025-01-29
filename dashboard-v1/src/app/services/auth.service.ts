import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
  
    private apiUrl = 'http://localhost:8080/auth'; // Cambia a la URL de tu API si es diferente
  
    constructor(private http: HttpClient) {}
  
    // Registro de usuario
  register(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, { username, password }, { responseType: 'text' as 'json' });
  }

  // Login de usuario (modificado para recibir el token como texto)
  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' as 'json' });
  }
    }