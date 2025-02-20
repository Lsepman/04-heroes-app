import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environment/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl; //URL para hacer las peticiones

  constructor(private http: HttpClient) { }

  //Metodo para obtener todos los heroes de la API
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/hero`); //Solicitud GET a la API, obtiene un array de heroes
  }

  //con el pipe capturamos el error en caso de undefined y lo metemos dentro de un of, porque la funcion devuelve un observable  y un undefined no es un observable, lo que hace el of es convertir el undefined en un observable
  getHeroById(id:string): Observable<Hero>{
    return this.http.get<Hero>(`${this.baseUrl}/hero/${id}`) //Solicitud GET con el id de heroe
    .pipe(catchError(error => of())); //Si hay error, devuelve un observable que emite un indefinido
  }
  //Metodo para agregar un nuevo heroe a la base de datos
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/hero`, hero) //Solicitud POST enviando el objeto del heroe al servidor
  }
  //Metodo para actualziar los datos de un heroe
  updateHero(hero: Hero): Observable<Hero>{
    if(!hero.id) throw Error('Hero id is required');//Si no tiene ID lanza un error
    return this.http.patch<Hero>(`${this.baseUrl}/hero/${hero.id}`, hero) //Solicitud Patch para actualizar el heroe
  }
  //Metodo para eliminar un heroe por el id
  deleteHeroById(id: string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/hero/${id}`) //Solcitud delete con el id
    .pipe(
      map( response => true), //Si exito devuelve true, MAP transforma los valores emitidos por el observable
      catchError(error=> of(false)) //si falla devuelve false, el OF crea un observable que emite un valor
    )
  }

  //Metodo para obtener sugerencias de heroes basada en su busqueda
  getSuggestions(query : string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/hero?q=${query}&_limit=6`) //Hece un GET con un query y limita a 6
  }
}
