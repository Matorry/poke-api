import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { Pokemons } from '../models/pokemons';
import { extendedType } from '../models/types';
import { RepoPokemonsService } from './repo.pokemons.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  pokeList: Pokemons;
  pokemons: Pokemon[];
  constructor(private repo: RepoPokemonsService, private state: StateService) {
    this.pokeList = {} as Pokemons;
    this.pokemons = [];
  }

  getPokelist(url: string): void {
    this.repo.getAll(url).subscribe({
      next: (response) => {
        this.state.setPokemonList(response);
        this.getPokemons();
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getPokemons(): void {
    this.state.getPokemonList().subscribe((pokeList) => {
      if (pokeList.results) {
        const pokemonObservables = pokeList.results.map((element) => {
          return this.repo.get(element.url);
        });

        forkJoin(pokemonObservables).subscribe({
          next: (pokemons) => {
            const existingPokemons = new Set(
              this.pokemons.map((pokemon) => pokemon.id)
            );
            pokemons.forEach((pokemon) => {
              if (!existingPokemons.has(pokemon.id)) {
                this.pokemons.push(pokemon);
                existingPokemons.add(pokemon.id);
              }
            });
            this.modifySprites(this.pokemons);
          },
        });
      }
    });
  }

  getFilterPokemons(type: extendedType) {
    this.state.setPokemonList();
    if (type) {
      const pokemonObservables = type.pokemon.map((element) => {
        return this.repo.get(element.pokemon.url);
      });

      forkJoin(pokemonObservables).subscribe({
        next: (pokemons) => {
          this.modifySprites(pokemons);
        },
      });
    }
  }
  private modifySprites(pokemons: Pokemon[]) {
    if (pokemons) {
      pokemons.forEach((pokemon) => {
        pokemon.sprites.other.official_artwork =
          pokemon.sprites.other['official-artwork'];
      });
      pokemons = pokemons.filter((pokemon) => {
        const sprites = pokemon.sprites;
        if (
          sprites?.other?.dream_world?.front_default ||
          sprites?.front_default ||
          sprites?.other?.official_artwork?.front_default ||
          sprites?.other?.home?.front_default
        ) {
          return true;
        }
        return false;
      });
      this.state.setPokemons(pokemons.sort((a, b) => a.id - b.id));
    }
  }
}
