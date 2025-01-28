import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitacion } from 'src/app/models/habitacion.model';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-editar-habitacion',
  templateUrl: './editar-habitacion.component.html',
  styleUrls: ['./editar-habitacion.component.css']
})
export class EditarHabitacionComponent implements OnInit {
  habitacion: Habitacion = {
    id: 0,
    idHotel: 0,
    numeroHabitacion: 0,
    tipo: '',
    precioNoche: 0
  };

  constructor(
    private habitacionService: HabitacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID desde la URL

    if (id) {
      this.habitacionService.obtenerHabitacionPorIdDinamico(id).subscribe({
        next: (response) => {
          this.habitacion = response; // Rellenar el formulario con los datos de la habitación
        },
        error: (error) => {
          alert('Error al cargar los datos de la habitación');
          console.error(error);
        }
      });
    }
  }

  editarHabitacion() {
    this.habitacionService.editarHabitacion(this.habitacion).subscribe({
      next: () => {
        alert('Habitación editada con éxito');
        this.router.navigate(['/admin/habitaciones']);
      },
      error: (error) => {
        alert('Error al editar la habitación');
        console.error(error);
      }
    });
  }
}
