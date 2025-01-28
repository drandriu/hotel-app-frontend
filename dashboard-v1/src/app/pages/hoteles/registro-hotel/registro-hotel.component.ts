import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-registro-hotel',
  templateUrl: './registro-hotel.component.html',
  styleUrls: ['./registro-hotel.component.css']
})
export class RegistroHotelComponent {
  hotel = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: ''
  };

  constructor(private hotelService: HotelService, private router: Router) {}

  registrarHotel() {
    this.hotelService.registrarHotel(this.hotel).subscribe({
      next: (response) => {
        alert('Hotel registrado con éxito');
        this.router.navigate(['/admin/hoteles']);
      },
      error: (error) => {
        alert('Error al registrar el hotel');
        console.error(error);
      }
    });
  }
}