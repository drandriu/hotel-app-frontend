export interface Huesped {
    idHuesped: number;  // Opcional, ya que lo genera el backend
    idHabitacion: string;
    nombre: string;
    apellido: string;
    dniPasaporte: string;
    fechaCheckIn: string;  // Formato ISO (ej. "2024-01-27T12:00:00Z")
    fechaCheckOut: string;
  }