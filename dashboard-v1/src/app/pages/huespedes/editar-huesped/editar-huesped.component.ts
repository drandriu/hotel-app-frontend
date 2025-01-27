import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Huesped } from 'src/app/models/huesped.model';
import { HuespedService } from 'src/app/services/huesped.service';

@Component({
  selector: 'app-editar-huesped',
  templateUrl: './editar-huesped.component.html',
  styleUrls: ['./editar-huesped.component.css']
})
export class EditarHuespedComponent implements OnInit {
  huesped: Huesped = {
    idHuesped: 0,  // Inicialmente vacío, se rellenará con la respuesta del backend
    idHabitacion: '',
    nombre: '',
    apellido: '',
    dniPasaporte: '',
    fechaCheckIn: '',
    fechaCheckOut: ''
  };

  constructor(
    private huespedService: HuespedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');  // Obtienes el ID del huésped desde la URL

    if (id) {
      this.huespedService.obtenerHuespedPorIdDinamico(id).subscribe({
        next: (response) => {
          this.huesped = response;  // Llenas los datos del huésped en el formulario
        },
        error: (error) => {
          alert('Error al cargar los datos del huésped');
          console.error(error);
        }
      });
    }
  }

  editarHuesped() {
    this.huespedService.editarHuesped(this.huesped).subscribe({
      next: (response) => {
        alert('Huésped editado con éxito');
        this.router.navigate(['/admin/huespedes']);
      },
      error: (error) => {
        alert('Error al editar huésped');
        console.error(error);
      }
    });
  }
}
