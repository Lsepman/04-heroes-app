import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";

//Aqui vamos a definir las rutas que vamos a utilizar en el modulo.Cada ruta tiene un path, un component. Dependiendo del modulo routing si es el principal de la aplicacion o de otro modulo lo utilizaremos como forRoot o como forChild
const routes: Routes=[
  {
    //localhost:4200/auth/
    path:'',
    component: LayoutPageComponent,
    children:[
      {path: 'login', component: LoginPageComponent},
      {path: 'new-account', component: RegisterPageComponent},
      {path:'**', redirectTo: 'login'}
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild( routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule{}
