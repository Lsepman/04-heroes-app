import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';



@NgModule({
  declarations: [
    Error404PageComponent
  ],
  exports:[
    Error404PageComponent //Exportamos para poder utilizarlo como una ruta por defecto del app-routing
  ]
})
export class SharedModule { }
