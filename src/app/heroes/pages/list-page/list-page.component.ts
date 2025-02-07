import { Component, OnInit } from '@angular/core';

import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../service/heroes.service';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{


 datos:Hero[] =[];

  constructor(private heroServicio: HeroesService){}

  ngOnInit(): void {
    this.heroServicio.getHeroes().subscribe(response => this.datos = response);
  }


}
