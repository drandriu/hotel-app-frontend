import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');  // Obtiene el token del localStorage
    if (token) {
      // Clonamos la solicitud y agregamos la cabecera Authorization con el token
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Cloned Request: ", clonedRequest.headers);  // Muestra los detalles de la solicitud clonada
      return next.handle(clonedRequest);  // Pasamos la solicitud clonada con la cabecera añadida
    }

    return next.handle(req);  // Si no hay token, se pasa la solicitud sin modificar
  }
}