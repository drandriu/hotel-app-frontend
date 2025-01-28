import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {
  servicio: Servicio = {
    id: 0, // Inicialmente vacío, se llenará con los datos del backend
    nombre: '',
    descripcion: ''
  };

  constructor(
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID desde la URL

    if (id) {
      this.servicioService.obtenerServicioPorIdDinamico(id).subscribe({
        next: (response) => {
          this.servicio = response; // Rellenar el formulario con los datos del servicio
        },
        error: (error) => {
          alert('Error al cargar los datos del servicio');
          console.error(error);
        }
      });
    }
  }

  editarServicio() {
    this.servicioService.editarServicio(this.servicio).subscribe({
      next: () => {
        alert('Servicio editado con éxito');
        this.router.navigate(['/admin/servicios']);
      },
      error: (error) => {
        alert('Error al editar el servicio');
        console.error(error);
      }
    });
  }
}