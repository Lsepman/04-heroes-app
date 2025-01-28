import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

//Aqui vamos a definir las rutas que vamos a utilizar en el modulo.Cada ruta tiene un path, un component. Dependiendo del modulo routing si es el principal de la aplicacion o de otro modulo lo utilizaremos como forRoot o como forChild
const routes: Routes = [
  {

    //localhost:4200/heroes
    //Wildcard se activara cuando la ruta este vacia.
    path:'',
    component: LayoutPageComponent,
    //Paginas hijas dentro de heroe, cargamos directamente sin carga perezosa
    children:[
      {path: 'new-hero', component: NewPageComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'edit/:id', component: NewPageComponent},
      {path: 'list', component: ListPageComponent},
      {path: ':id', component: HeroPageComponent}, //Debe estar al final del listado, ya que coincide con todas las rutas anteriores y provocaria nunca entrar por ella
      {path: '**', redirectTo: 'list'}
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
