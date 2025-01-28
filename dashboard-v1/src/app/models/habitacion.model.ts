export interface Habitacion {
    id: number; // Opcional porque es generado por el backend
    numeroHabitacion: number;
    tipo: string;
    precioNoche: number;
    idHotel: number; // Asumiendo que la habitación está asociada a un hotel
  }