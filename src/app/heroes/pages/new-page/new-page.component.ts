import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../service/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  //Formulario con los campos y validaciones
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
    publisher: new FormControl<Publisher>(Publisher.DCComics,[Validators.required]),
    alter_ego: new FormControl('',[Validators.required]),
    first_appearance: new FormControl('',[Validators.required]),
    characters: new FormControl('',[Validators.required]),
    alt_img: new FormControl(''),
  });



  public publishers =[
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  public heroes: Hero[] = []; //Array para almacenar heroes


  constructor(private heroeService: HeroesService,
    private snackBar: MatSnackBar, //Servicio para mostrar notificaciones emergentes
    private router: Router, //Servicio para navegar por paginas
    private activatedRoute: ActivatedRoute, //Servicio para obtener parametros URL
    private dialog: MatDialog //Servicio para manejar dialogos de confirmacion
    ){}

  //Getter que obtiene los valores del formulario y los convierte en un objeto
  get currentHero(): Hero{
    const hero= this.heroForm.value as Hero;
    return hero;
  }

  //Se ejecuta cuando el componente se inicializa
  ngOnInit() : void{
    const heroeId = this.activatedRoute.snapshot.paramMap.get('id'); //Obtiene el id desde la URL
    if(heroeId){ //SI hay ID en la URL, se esta editando un heroe
      this.heroeService.getHeroById(heroeId).subscribe(hero =>{ //LLamada al servicio para obtener el heroe
        if(hero){ //Si hay heroe rellena el formulario con los datos del Heroe
        this.heroForm.patchValue(hero);
      }else {
        this.showSnackBar('Heroe no encontrado'); //Mensaje si no se encuentra Heroe
        this.router.navigate(['/heroes']) //Redireccion a la lista de heroes
      }
      });
    }
  }

  //Se ejecuta al enviar el formulario
  onSubmit() : void{
    if(this.heroForm.invalid) return; //Si es invalido no hace nada

    if(this.currentHero.id){ //Si tiene id se actualiza en la base de datos
      this.heroeService.updateHero(this.currentHero)
      .subscribe(hero=>{
        this.showSnackBar(`${hero.superhero} updated!`) //Mensaje de exito
      });
      return;
    }
    //SI no tiene ID se crea uno nuevo
    this.heroeService.addHero(this.currentHero)
    .subscribe(hero=>{
      this.showSnackBar(`${hero.superhero} created!`) //esto crea las pequeñas respuestas cuando se crea un heroe abajo nos aparece el recuadro con heroe creado
    })
    }

    //Metodo para eliminar un heroe
    public onDeleteHero(){
      if(!this.currentHero.id) throw Error('Heroe id is required') // SI no hay Id lanza error
      //Cuadro de dialogo de confirmacion antes de eliminar el heroe
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: this.heroForm.value,});
      dialogRef.afterClosed().subscribe(result =>{ //Espera a que cierre el cuadro de dialogo
      if(!result) return; //Si se cancela no hace nada
      this.heroeService.deleteHeroById(this.currentHero.id).subscribe(result => {
        if(result){ //Si no cancela elimina mensaje
          this.showSnackBar("Heroe eliminado con exito");
          this.router.navigate(['/heroes']);
        }else{
          this.showSnackBar('Error al eliminar el heroe');
        }
      });
    });
    }

    //MEtodo para mostrar mensajes emergentes en pantalla
    private showSnackBar(message: string): void{
      this.snackBar.open(message, 'OK', {
        duration: 2500,
      })
    }


  }


