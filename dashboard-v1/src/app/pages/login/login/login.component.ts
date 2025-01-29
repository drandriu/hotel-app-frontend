import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  usuarioAutenticado: string | null = null;

  constructor(private authService: AuthService) {}


  ngOnInit() {
    this.usuarioAutenticado = localStorage.getItem('username');
  }
  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        alert('Inicio de sesión exitoso.');
        //console.log('Login exitoso, token:', response);  // El token JWT debe ser una cadena de texto
        // Guarda el token o haz algo con él
        localStorage.setItem('token', response);  // Guarda el token en el localStorage
        localStorage.setItem('username', this.username);
        this.usuarioAutenticado = this.username; // Actualiza la variable en la vista
        location.reload();
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        alert('Credenciales incorrectas');
      }
    });
  }

  onRegister() {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        alert('Registro exitoso.');
        // Realiza alguna acción después de registrar, como redirigir a login
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error al registrar usuario');
      }
    });
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.usuarioAutenticado = null;
    location.reload();
  }
}
