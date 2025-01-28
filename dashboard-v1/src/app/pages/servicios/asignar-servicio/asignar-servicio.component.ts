import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-asignar-servicio',
  templateUrl: './asignar-servicio.component.html',
  styleUrls: ['./asignar-servicio.component.css']
})
export class AsignarServicioComponent {
  idServicio: number = 0;
  idHotel: number = 0;

  constructor(
    private servicioService: ServicioService,
    private router: Router
  ) {}

  asignarServicio() {
    if (this.idServicio && this.idHotel) {
      this.servicioService.asignarServicioAHotel(this.idServicio, this.idHotel).subscribe({
        next: (response) => {
          console.log(response); // Verifica la respuesta en la consola
          alert('Servicio asignado correctamente');
          this.router.navigate(['/admin/servicios']);
        },
        error: (error) => {
          console.log(error); // Verifica la respuesta en la consola
          alert('Error al asignar el servicio');
          console.error(error);
        }
      });
    } else {
      alert('Por favor, complete ambos campos.');
    }
  }
}
