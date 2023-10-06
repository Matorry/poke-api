import { Component, OnInit } from '@angular/core';
import { Type, extendedType } from 'src/app/models/types';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { RepoPokemonsService } from 'src/app/services/repo.pokemons.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'poke-api-pokemon-form',
  templateUrl: './pokemon.form.component.html',
  styleUrls: ['./pokemon.form.component.scss'],
})
export class PokemonFormComponent implements OnInit {
  types: Type[] | null;
  type: extendedType | null;
  constructor(
    private repo: RepoPokemonsService,
    private state: StateService,
    private pokeService: PokemonsService
  ) {
    this.types = null;
    this.type = null;
  }

  ngOnInit() {
    this.repo.getTypes().subscribe({
      next: (resp) =>
        (this.types = resp.results.slice(0, resp.results.length - 2)),
      error: (resp) => console.log(resp),
    });
  }

  filterPokemonsByType(url: string) {
    if (url) {
      this.repo.getType(url).subscribe({
        next: (resp) => {
          this.type = resp;
          this.pokeService.getFilterPokemons(this.type);
        },
      });
      return;
    }
    this.pokeService.getPokelist(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );
  }
}
