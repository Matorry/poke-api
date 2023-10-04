import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Pokemon } from 'src/models/pokemon';
import { Pokemons } from 'src/models/pokemons';
import { RepoPokemonsServiceService } from 'src/services/repo.pokemons.service.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pokeList: Pokemons;
  pokemons: Pokemon[];
  constructor(
    private repo: RepoPokemonsServiceService,
    private state: StateService
  ) {
    this.pokeList = {} as Pokemons;
    this.pokemons = [];
  }
  ngOnInit(): void {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
    this.getPokelist(url);
  }
  getPokelist(url: string) {
    this.repo.getAll(url).subscribe({
      next: (response) => {
        this.state.setPokemonList(response);
        this.state.getPokemonList().subscribe((data) => (this.pokeList = data));
        this.getPokemons();
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getPokemons() {
    this.pokemons = [];
    const pokemonObservables = this.pokeList.results.map((element) => {
      return this.repo.get(element.url);
    });

    forkJoin(pokemonObservables).subscribe({
      next: (responses) => {
        this.pokemons = responses.sort((a, b) => a.id - b.id);
        this.state.setPokemons(this.pokemons);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleNext() {
    if (this.pokeList.next) this.getPokelist(this.pokeList.next);
  }
  handlePrevious() {
    if (this.pokeList.previous) this.getPokelist(this.pokeList.previous);
  }
}
