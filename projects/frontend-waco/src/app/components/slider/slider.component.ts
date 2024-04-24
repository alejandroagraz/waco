import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public sliderUser: string;
  public sliderPokemon: string;

  constructor() {
    this.sliderUser = 'Puedes listar usuarios';
    this.sliderPokemon = 'Puedes listar pokemons';
  }

  ngOnInit(): void {
  }

}
