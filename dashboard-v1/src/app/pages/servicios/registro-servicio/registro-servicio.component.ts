import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-registro-servicio',
  templateUrl: './registro-servicio.component.html',
  styleUrls: ['./registro-servicio.component.css']
})
export class RegistroServicioComponent {
  servicio = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  constructor(private servicioService: ServicioService, private router: Router) {}

  registrarServicio() {
    this.servicioService.registrarServicio(this.servicio).subscribe({
      next: (response) => {
        alert('Servicio registrado con éxito');
        this.router.navigate(['/admin/servicios']);
      },
      error: (error) => {
        alert('Error al registrar el servicio');
        console.error(error);
      }
    });
  }
}