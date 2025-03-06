import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';
import { canActivateGuardpublic, canMatchGuardpublic } from './auth/guards/public.guard';



//Aqui vamos a definir las rutas que vamos a utilizar en el modulo.Cada ruta tiene un path, un component. Dependiendo del modulo routing si es el principal de la aplicacion o de otro modulo lo utilizaremos como forRoot o como forChild
const routes: Routes = [
  {
    //Cargamos los modulos mediante carga perezosa.
    path: 'auth',
    loadChildren:() => import('./auth/auth.module').then(m=>m.AuthModule),
    canMatch:[canMatchGuardpublic],
    canActivate:[canActivateGuardpublic]
  },
  {
    path:'heroes',
    loadChildren:() => import('./heroes/heroes.module').then(m=>m.HeroesModule),
    canMatch: [canMatchGuard], //Ancla la funcion del canMatch
    canActivate: [canActivateGuard],
  },
  {
    //Ruta pagina de error
    path:'404',
    component: Error404PageComponent
  },
  {

  //Para dejar una ruta por defecto que redirija a heroes
  path: '' ,
  redirectTo: 'heroes',
  pathMatch: 'full' //Añadimos esto porque hay muchas cadenas vacias en cualquier ruta que provocan error
  },
  {
    //Ruta comodin que nos envia a la pagina de error
    path:'**',
    redirectTo: '404'
  }
];

//Aqui vemos que utilizamos forRoot porque es la principal de la aplicacion
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
