import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../service/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';


@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){

  }
  //Desetructuramos params para obtener el id y se lo pasamos al servicio
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroesService.getHeroById( id ))
      ).subscribe( hero => {
      if( !hero ) return this.router.navigate(['/heroes/list']);

      this.hero = hero;
      console.log(hero);

      return;
    })
  }

  back(): void{
    this.router.navigate(['/heroes/list']);
  }



}
