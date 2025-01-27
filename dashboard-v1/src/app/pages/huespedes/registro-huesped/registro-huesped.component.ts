import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HuespedService, PaginatedResponse } from '../../../services/huesped.service';

@Component({
  selector: 'app-registro-huesped',
  templateUrl: './registro-huesped.component.html',
  styleUrls: ['./registro-huesped.component.css']
})
export class RegistroHuespedComponent {
  huesped = {
    idHuesped: 0,
    idHabitacion: '',  // Cambiado de habitacionId a idHabitacion como en el modelo
    nombre: '',
    apellido: '',
    dniPasaporte: '',
    fechaCheckIn: '',
    fechaCheckOut: ''
  };

  constructor(private huespedService: HuespedService, private router: Router) {}

  registrarHuesped() {
    this.huespedService.registrarHuesped(this.huesped).subscribe({
      next: (response) => {
        alert('Huésped registrado con éxito');
        this.router.navigate(['/admin/huespedes']);
      },
      error: (error) => {
        alert('Error al registrar huésped');
        console.error(error);
      }
    });
  }
}
