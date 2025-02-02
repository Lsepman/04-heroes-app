import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems =[
    {label: 'Listado', icon: 'label', route:'/heroes/list'},
    {label: 'Añadir', icon: 'add', route:'/heroes/new-hero'},
    {label:'Buscar', icon: 'search', route:'/heroes/search'},
  ]

}
