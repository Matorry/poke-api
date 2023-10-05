import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Pokemon } from 'src/models/pokemon';
import { Pokemons } from 'src/models/pokemons';
import { RepoPokemonsServiceService } from 'src/services/repo.pokemons.service.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'poke-api-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  pokeList: Pokemons;
  pokemons: Pokemon[];
  totalPages: number;
  currentPage: number;
  constructor(
    private repo: RepoPokemonsServiceService,
    private state: StateService
  ) {
    this.pokeList = {} as Pokemons;
    this.pokemons = [];
    this.totalPages = 0;
    this.currentPage = 1;
  }
  ngOnInit(): void {
    const url = 'https://poke-api.co/api/v2/pokemon?limit=20&offset=0';
    this.getPokelist(url);
  }
  getPokelist(url: string) {
    this.repo.getAll(url).subscribe({
      next: (response) => {
        this.state.setPokemonList(response);
        this.state.getPokemonList().subscribe((data) => (this.pokeList = data));
        this.getPokemons();
        this.totalPages = Math.ceil(this.pokeList.count / 20);
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
      next: (pokemons) => {
        this.pokemons = pokemons.sort((a, b) => a.id - b.id);
        this.state.setPokemons(this.pokemons);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleNext() {
    if (this.pokeList.next)
      this.getPokelist(this.pokeList.next), this.currentPage++;
  }
  handlePrevious() {
    if (this.pokeList.previous)
      this.getPokelist(this.pokeList.previous), this.currentPage--;
  }
}
