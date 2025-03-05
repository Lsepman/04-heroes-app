import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems =[
    {label: 'Listado', icon: 'label', route:'./list'},
    {label: 'Añadir', icon: 'add', route:'./new-hero'},
    {label:'Buscar', icon: 'search', route:'./search'},
  ]

  constructor(private authService: AuthService,
    private router: Router
  ){}

  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['/auth'])
  }

  get user(): User | undefined{
    return this.authService.getcurrentUser();
  }

}
