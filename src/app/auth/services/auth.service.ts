import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environment/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl= environments.baseUrl;
  private user? : User;
  constructor(private http: HttpClient) { }

  getcurrentUser(): User | undefined{
    if(!this.user) return undefined;

    //return {...this.user}; Se puede usar esto o el de abajo, el spread solo copia los atributos del primer nivel

    return structuredClone(this.user) // es mas eficiente y permite copiar atributos de todos los niveles

  }

  login(email: string, password: string) : Observable<User>{

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      tap(user => localStorage.setItem('token', 'aigfsdaogfighfgsdaihglfahalfghfdalghflghafli'))
    )
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean>{
    if( !localStorage.getItem('token')) return of(false);
    const token= localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      map( user => !!user),
      catchError (err => of(false))
    )
  }
}
