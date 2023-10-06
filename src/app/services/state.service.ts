import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { Pokemons } from 'src/app/models/pokemons';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  pokemonList$: BehaviorSubject<Pokemons>;
  pokemons$: BehaviorSubject<Pokemon[]>;
  isOpenModal$: BehaviorSubject<boolean>;
  constructor() {
    this.pokemonList$ = new BehaviorSubject({} as Pokemons);
    this.pokemons$ = new BehaviorSubject<Pokemon[]>([]);
    this.isOpenModal$ = new BehaviorSubject<boolean>(false);
  }

  getPokemons() {
    return this.pokemons$.asObservable();
  }

  getPokemonList() {
    return this.pokemonList$.asObservable();
  }

  getIsOpenModal() {
    return this.isOpenModal$.asObservable();
  }

  setPokemonList(pokemonList?: Pokemons) {
    if (pokemonList) return this.pokemonList$.next(pokemonList);
    return this.pokemonList$.next({} as Pokemons);
  }

  setPokemons(pokemons: Pokemon[]) {
    return this.pokemons$.next(pokemons);
  }

  setIsOpenModal(isOpen: boolean) {
    return this.isOpenModal$.next(isOpen);
  }
}
