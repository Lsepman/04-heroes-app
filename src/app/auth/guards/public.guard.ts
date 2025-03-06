import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, Observable, tap } from "rxjs";
import { inject } from "@angular/core";

const checkAuthStatus =(): Observable<boolean> =>{
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
    tap(isAuthenticated =>{
      if(isAuthenticated){
        router.navigate(['/heroes/list'])
      }

    }),
    map(isAuthenticated => !isAuthenticated) //Modifica la salida

  )

}

export const canActivateGuardpublic: CanActivateFn =(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
)=> {
  console.log('CanActivate');
  console.log({route, state});

  return checkAuthStatus();
}

//CanMatchFn es para que podamos entrar a una ruta que haga cierto match de la URL
export const canMatchGuardpublic: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({route, segments});

  return checkAuthStatus();
}


