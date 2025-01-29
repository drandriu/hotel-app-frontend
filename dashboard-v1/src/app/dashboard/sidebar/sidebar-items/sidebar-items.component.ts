import { Component } from '@angular/core';

@Component({
  selector: 'sidebar-items',
  templateUrl: './sidebar-items.component.html'
})
export class SidebarItemsComponent {

  usuarioAutenticado: boolean = false;

  ngOnInit() {
    this.usuarioAutenticado = !!localStorage.getItem('username'); // Verifica si hay un usuario autenticado
      }
}
