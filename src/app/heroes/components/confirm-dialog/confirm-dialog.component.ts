import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {
    constructor(
      public dialogRef : MatDialogRef<ConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Hero, //Inyecta los datos del heroe
    ){}

    //Cierra el dialogo sin confirmar
    onNoClick(): void{
      this.dialogRef.close();
    }
    //Confirma la eliminacion y envia true como respuesta
    onConfirm(): void{
      this.dialogRef.close(true);
    }
}
