import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../service/heroes.service';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
    publisher: new FormControl<Publisher>(Publisher.DCComics,[Validators.required]),
    alter_ego: new FormControl('',[Validators.required]),
    first_appearance: new FormControl('',[Validators.required]),
    characters: new FormControl('',[Validators.required]),
    alt_img: new FormControl(''),
  });

  public heroes: Hero[] = [];

  public publishers =[
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  constructor(private heroeService: HeroesService){}

  onSubmit(){
    if(this.heroForm.valid){
     const hero = this.heroForm.getRawValue(); //Devuelve un objeto con los valores del formulario actuales incluidos los deshabilitados
     this.heroeService.addHero(hero as Hero)
     this.heroForm.reset()
     console.log(hero)
    }
  }




}
