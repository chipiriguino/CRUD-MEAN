import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/Pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-peliculas-listado',
  templateUrl: './peliculas-listado.component.html',
  styleUrls: ['./peliculas-listado.component.css']
})
export class PeliculasListadoComponent implements OnInit {

  lstPelis:any;
  texto:string = "Mi titulo de peli ";
  edtiMode = false;
  peli2edit:Pelicula = {titulo: "", generos:[], productora: ""};

  constructor(private peliService: PeliculasService) {
    this.reset();
  }

  ngOnInit(): void {
    this.loadPelis();
    this.reset();
  }

  reset() {
    this.edtiMode = false;
    this.peli2edit = {titulo: "", generos:[], productora: ""};
  }

  loadPelis() {
    this.lstPelis = this.peliService.getPeliculas();
  }

  insertPelicula() {
    var peli = {
      titulo: this.texto,
      generos: [],
      productora: ""
    }

    this.peli2edit = peli;
    this.save();
  }

  edit(id:string) {
    this.peliService.findPeliById(id).subscribe(data => {
      this.peli2edit = data;
      this.edtiMode = true;
    });
  }

  cancelEdit() {
    this.reset();
  }

  save() {
    let request;
    if(typeof this.peli2edit._id !=="undefined") {
      request = this.peliService.updatePeli(this.peli2edit);
    } else {
      request = this.peliService.insertPelicula(this.peli2edit);
    }

    request.subscribe(res => {
      console.log(res); 
      this.loadPelis();
      this.reset();
    });
  }

  delete(id:string) {
    this.peliService.delPeli(id).toPromise().then(res => {
      console.log(res);
      this.loadPelis();
    });
  }

}
