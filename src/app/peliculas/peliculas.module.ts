import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { PeliculasListadoComponent } from './peliculas-listado/peliculas-listado.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PeliculasListadoComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    FormsModule
  ]
})
export class PeliculasModule { }
