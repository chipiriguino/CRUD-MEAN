import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pelicula } from '../models/Pelicula';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  urlBase = "http://localhost:4000/peliculas/";

  constructor(private http: HttpClient) { }

  getPeliculas(): Observable<any> {
    let url = this.urlBase;

    return this.http.get(url);
  }

  insertPelicula(pelicula: Pelicula): Observable<any> {
    let url = this.urlBase;
    
    return this.http.post(url, pelicula, {responseType: 'json'})
      .pipe(
        catchError(e => {
          console.log(e); 
          return throwError(e);
        })
      );
  }

  findPeliById(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.get(url);
  }

  updatePeli(peli: Pelicula): Observable<any> {
    let url = this.urlBase+peli._id;
    delete peli._id;
    return this.http.put(url, peli);
  }

  delPeli(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.delete(url);
  }


}
