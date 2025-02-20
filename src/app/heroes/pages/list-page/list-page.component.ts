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


 heroes:Hero[] =[];

  constructor(private heroeServicio: HeroesService){}

  ngOnInit(): void {
    this.heroeServicio.getHeroes().subscribe(response => this.heroes = response);
  }


}
