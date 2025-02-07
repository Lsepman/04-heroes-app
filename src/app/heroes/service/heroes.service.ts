import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environment/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/hero`);
  }

  //con el pipe capturamos el error en caso de undefined y lo metemos dentro de un of, porque la funcion devuelve un observable  y un undefined no es un observable, lo que hace el of es convertir el undefined en un observable
  getHeroById(id:string): Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/hero/${id}`).pipe(catchError(error => of(undefined)));
  }
}
