import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-registro-habitacion',
  templateUrl: './registro-habitacion.component.html',
  styleUrls: ['./registro-habitacion.component.css']
})
export class RegistroHabitacionComponent {
  habitacion = {
    id: 0,
    numeroHabitacion: 0,
    tipo: '',
    precioNoche: 0,
    idHotel: 0 // El ID del hotel se asocia al registrar
  };

  constructor(private habitacionService: HabitacionService, private router: Router) {}

  registrarHabitacion() {
    this.habitacionService.registrarHabitacion(this.habitacion).subscribe({
      next: (response) => {
        alert('Habitación registrada con éxito');
        this.router.navigate(['/admin/habitaciones']);
      },
      error: (error) => {
        alert('Error al registrar la habitación');
        console.error(error);
      }
    });
  }
}