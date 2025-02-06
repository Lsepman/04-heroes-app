import { Component, OnInit } from '@angular/core';

import { Hero } from '../../interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{


  private hero: Hero[] =[];

  constructor(private http: HttpClient){}

  ngOnInit(): void {


  }


}
