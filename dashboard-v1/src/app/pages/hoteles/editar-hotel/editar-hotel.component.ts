import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-editar-hotel',
  templateUrl: './editar-hotel.component.html',
  styleUrls: ['./editar-hotel.component.css']
})
export class EditarHotelComponent implements OnInit {
  hotel: Hotel = {
    id: 0, // Inicialmente vacío, se llenará con los datos del backend
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: ''
  };

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID desde la URL

    if (id) {
      this.hotelService.obtenerHotelPorIdDinamico(id).subscribe({
        next: (response) => {
          this.hotel = response; // Rellenar el formulario con los datos del hotel
        },
        error: (error) => {
          alert('Error al cargar los datos del hotel');
          console.error(error);
        }
      });
    }
  }

  editarHotel() {
    this.hotelService.editarHotel(this.hotel).subscribe({
      next: () => {
        alert('Hotel editado con éxito');
        this.router.navigate(['/admin/hoteles']);
      },
      error: (error) => {
        alert('Error al editar el hotel');
        console.error(error);
      }
    });
  }
}
