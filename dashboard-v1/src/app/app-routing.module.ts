import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { UxComponent } from './pages/zzzz4/ux.component';
import { ArComponent } from './pages/zzzz1/ar.component';
import { HuespedesComponent } from './pages/huespedes/huespedes.component';
import { UpdateComponent } from './pages/zzzz3/update.component';
import { HotelesComponent } from './pages/hoteles/hoteles.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { DocumentationComponent } from './pages/zzzz2/documentation.component';
import { HabitacionesComponent } from './pages/habitaciones/habitaciones.component';
import { RegistroHuespedComponent } from './pages/huespedes/registro-huesped/registro-huesped.component';
import { EditarHuespedComponent } from './pages/huespedes/editar-huesped/editar-huesped.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/huespedes', component: HuespedesComponent },
  { path: 'admin/hoteles', component: HotelesComponent },
  { path: 'admin/servicios', component: ServiciosComponent },
  { path: 'admin/habitaciones', component: HabitacionesComponent },
  {path: 'admin/huespedes/registro', component: RegistroHuespedComponent},
  { path: 'admin/huespedes/editar/:id', component: EditarHuespedComponent }, // Ruta para editar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
