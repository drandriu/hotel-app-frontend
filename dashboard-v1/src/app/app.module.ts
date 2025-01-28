import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// dashboard components
import { LayoutComponent } from './dashboard/layout/layout.component';
import { TopBarComponent } from './dashboard/top-bar/top-bar.component';
import { OverlayComponent } from './dashboard/overlay/overlay.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar/sidebar.component';
import { SidebarItemComponent } from './dashboard/sidebar/sidebar-item/sidebar-item.component';
import { SidebarItemsComponent } from './dashboard/sidebar/sidebar-items/sidebar-items.component';
import { SidebarHeaderComponent } from './dashboard/sidebar/sidebar-header/sidebar-header.component';
import { SidebarItemSectionComponent } from './dashboard/sidebar/sidebar-item-section/sidebar-item-section.component';

// pages
import { UxComponent } from './pages/zzzz4/ux.component';
import { ArComponent } from './pages/zzzz1/ar.component';
import { HomeComponent } from './pages/home/home.component';
import { HuespedesComponent } from './pages/huespedes/huespedes.component';
import { UpdateComponent } from './pages/zzzz3/update.component';
import { HotelesComponent } from './pages/hoteles/hoteles.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { DocumentationComponent } from './pages/zzzz2/documentation.component';
import { HabitacionesComponent } from './pages/habitaciones/habitaciones.component';

// icons
import { ArIconComponent } from './dashboard/icons/ar-icon/ar-icon.component';
import { UxIconComponent } from './dashboard/icons/ux-icon/ux-icon.component';
import { DocIconComponent } from './dashboard/icons/doc-icon/doc-icon.component';
import { AppsIconComponent } from './dashboard/icons/apps-icon/apps-icon.component';
import { VideoIconComponent } from './dashboard/icons/video-icon/video-icon.component';
import { UpdatesIconComponent } from './dashboard/icons/updates-icon/updates-icon.component';
import { PhotographyIconComponent } from './dashboard/icons/photography-icon/photography-icon.component';
import { IllustrationIconComponent } from './dashboard/icons/illustration-icon/illustration-icon.component';
import { GraphicDesignIconComponent } from './dashboard/icons/graphic-design-icon/graphic-design-icon.component';

// others
import { DocComponent } from './components/docs/doc/doc.component';
import { ContentComponent } from './components/content/content.component';
import { SnippetComponent } from './components/docs/snippet/snippet.component';
import { FolderIconComponent } from './components/docs/icons/folder-icon/folder-icon.component';
import { AngularIconComponent } from './components/docs/icons/angular-icon/angular-icon.component';
import { HttpClientModule } from '@angular/common/http';
import { HuespedService } from './services/huesped.service';
import { FormsModule } from '@angular/forms';
import { RegistroHuespedComponent } from './pages/huespedes/registro-huesped/registro-huesped.component';
import { EditarHuespedComponent } from './pages/huespedes/editar-huesped/editar-huesped.component';
import { RegistroHotelComponent } from './pages/hoteles/registro-hotel/registro-hotel.component';
import { EditarHotelComponent } from './pages/hoteles/editar-hotel/editar-hotel.component';
import { RegistroServicioComponent } from './pages/servicios/registro-servicio/registro-servicio.component';
import { EditarServicioComponent } from './pages/servicios/editar-servicio/editar-servicio.component';
import { AsignarServicioComponent } from './pages/servicios/asignar-servicio/asignar-servicio.component';
import { RegistroHabitacionComponent } from './pages/habitaciones/registro-habitacion/registro-habitacion.component';
import { EditarHabitacionComponent } from './pages/habitaciones/editar-habitacion/editar-habitacion.component';


@NgModule({
  declarations: [
    AppComponent,

    // dashboard
    LayoutComponent,
    TopBarComponent,
    OverlayComponent,
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemsComponent,
    SidebarHeaderComponent,
    SidebarItemSectionComponent,

    // pages
    UxComponent,
    ArComponent,
    HomeComponent,
    HuespedesComponent,
    UpdateComponent,
    HotelesComponent,
    ServiciosComponent,
    HabitacionesComponent,
    DocumentationComponent,

    // icons
    ArIconComponent,
    UxIconComponent,
    DocIconComponent,
    AppsIconComponent,
    VideoIconComponent,
    UpdatesIconComponent,
    PhotographyIconComponent,
    IllustrationIconComponent,
    GraphicDesignIconComponent,

    // others
    DocComponent,
    SnippetComponent,
    ContentComponent,
    FolderIconComponent,
    AngularIconComponent,
    RegistroHuespedComponent,
    EditarHuespedComponent, 
    HotelesComponent, RegistroHotelComponent, EditarHotelComponent, ServiciosComponent, RegistroServicioComponent,
    RegistroServicioComponent,
    EditarServicioComponent,
    AsignarServicioComponent,
    RegistroHabitacionComponent,
    EditarHabitacionComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [HuespedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
