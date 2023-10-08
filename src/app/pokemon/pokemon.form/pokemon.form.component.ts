import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type, extendedType } from 'src/app/models/types';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { RepoPokemonsService } from 'src/app/services/repo.pokemons.service';

@Component({
  selector: 'poke-api-pokemon-form',
  templateUrl: './pokemon.form.component.html',
  styleUrls: ['./pokemon.form.component.scss'],
})
export class PokemonFormComponent implements OnInit {
  types: Type[] | null;
  type: extendedType | null;
  error: string | null;
  constructor(
    private router: Router,
    private repo: RepoPokemonsService,
    private pokeService: PokemonsService
  ) {
    this.types = null;
    this.type = null;
    this.error = null;
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

  filterPokemonsById(id: string) {
    if (id) {
      this.repo.getById(id).subscribe({
        next: (resp) => {
          this.router.navigate(['pokemon/', resp.id.toString()]);
        },
        error: () => (this.error = 'Pokemon not found'),
      });
      return;
    }
    this.error = 'Insert id';
  }

  filterPokemonsByName(name: string) {
    if (name) {
      const url = ' https://pokeapi.co/api/v2/pokemon/' + name.toLowerCase();
      this.repo.get(url).subscribe({
        next: (resp) => {
          this.router.navigate(['pokemon/', resp.id.toString()]);
        },
        error: () => (this.error = 'Pokemon not found'),
      });
      return;
    }
    this.error = 'Insert name';
  }
}
