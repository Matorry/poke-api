import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
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
  showButton = false;
  scrollHeigth = 500;
  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private repo: RepoPokemonsServiceService,
    private state: StateService
  ) {
    this.pokeList = {} as Pokemons;
    this.pokemons = [];
  }
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.scrollY;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet | scrollTop) > this.scrollHeigth;
  }
  ngOnInit(): void {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
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
    const pokemonObservables = this.pokeList.results.map((element) => {
      return this.repo.get(element.url);
    });

    forkJoin(pokemonObservables).subscribe({
      next: (pokemons) => {
        this.pokemons = this.pokemons.concat(
          pokemons.sort((a, b) => a.id - b.id)
        );
        this.state.setPokemons(this.pokemons);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(): void {
    if (this.pokeList.next) this.getPokelist(this.pokeList.next);
  }
}
