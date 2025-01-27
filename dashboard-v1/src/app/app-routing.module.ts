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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/huespedes', component: HuespedesComponent },
  { path: 'admin/hoteles', component: HotelesComponent },
  { path: 'admin/servicios', component: ServiciosComponent },
  { path: 'admin/habitaciones', component: HabitacionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
