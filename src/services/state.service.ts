import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/models/pokemon';
import { Pokemons } from 'src/models/pokemons';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  pokemonList$: BehaviorSubject<Pokemons>;
  pokemons$: BehaviorSubject<Pokemon[]>;
  constructor() {
    this.pokemonList$ = new BehaviorSubject({} as Pokemons);
    this.pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  }

  getPokemons() {
    return this.pokemons$.asObservable();
  }

  getPokemonList() {
    return this.pokemonList$.asObservable();
  }

  setPokemonList(pokemonList: Pokemons) {
    return this.pokemonList$.next(pokemonList);
  }

  setPokemons(pokemons: Pokemon[]) {
    return this.pokemons$.next(pokemons);
  }
}
