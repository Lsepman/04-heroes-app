import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environment/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  //con el pipe capturamos el error en caso de undefined y lo metemos dentro de un of, porque la funcion devuelve un observable  y un undefined no es un observable, lo que hace el of es convertir el undefined en un observable
  getHeroById(id:string): Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(catchError(error => of(undefined)));
  }
  addHero(hero: Hero): Observable<Hero>{
    const body= JSON.stringify(hero);
    return this.http.post<Hero>(`${this.baseUrl} /heroes`, hero)
  }
  updateHero(hero: Hero): Observable<Hero>{
    if(!hero.id) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero)
  }
  deleteHeroById(id: string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map( response => true),
      catchError(error=> of(false))
    )
  }
  getSuggestions(query : string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/hero?q=${query}&_limit=6`)
  }
}
