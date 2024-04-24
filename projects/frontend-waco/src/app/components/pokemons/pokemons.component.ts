import { Component, OnInit } from '@angular/core';
import {Pokemon, Pokemons} from "../../models/pokemons";
import {Meta} from "../../models/meta";
import {PokemonService} from "../../services/pokemons.service";
import {UsersService} from "../../services/users.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  public pokemons:  Pokemons;

  constructor(
    private _pokemonService: PokemonService,
    private _usersService: UsersService
  ) {
    this.pokemons = new Pokemons([
        new Pokemon('', ''
        )],
      new Meta(0,0,0,0,false,false)
    );
  }

  ngOnInit(): void {
    this.getPokemons()
  }
  getPokemons() {
    this._pokemonService.getPokemons().subscribe((resp:any) => {
        if (resp) {
          this.pokemons = resp;
        }
      },
      err => {
        Swal.fire(
          'Ocurrio un error!!',
          err.error.message[0],
          'error'
        );
      }
    );
  }

  addFavorite(pokemon: Pokemon) {
    this._usersService.addFavoriteUser(pokemon).subscribe((resp:any) => {
        if (resp) {
          Swal.fire(
            'Pokemon favorito',
            'El pokemon se ha agregado correctamente al usuario en sesión',
            'success'
          );
        } else {
          Swal.fire(
            'Edición fallida!!',
            'El Pokemon no se ha agregado correctamente',
            'error'
          );
        }
      },
      err => {
        Swal.fire(
          'Ocurrio un error!!',
          err.error.message[0],
          'error'
        );
      }
    );
  }
}
