import {User} from "./user";
import {Meta} from "./meta";

export class Pokemons{
  constructor(
    public data: Pokemon[],
    public meta: Meta,
  ){}
}

export class Pokemon{
  constructor(
    public name: string,
    public url: string,
  ){}
}
