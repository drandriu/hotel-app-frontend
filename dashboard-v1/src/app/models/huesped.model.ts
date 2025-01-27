export interface Huesped {
    idHuesped: number;
    idHabitacion: number;
    nombre: string;
    apellido: string;
    dniPasaporte: string;
    fechaCheckIn: string;  // Las fechas vienen como string desde el backend (formato ISO)
    fechaCheckOut: string;
  }