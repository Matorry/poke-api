import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { Pokemons } from 'src/app/models/pokemons';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'poke-api-pokemon.list',
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
    private state: StateService,
    private pokeService: PokemonsService
  ) {
    this.pokeList = {} as Pokemons;
    this.pokemons = [];
    this.state.getPokemons().subscribe((data) => (this.pokemons = data));
    this.state.getPokemonList().subscribe((data) => (this.pokeList = data));
  }
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.scrollY;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet | scrollTop) > this.scrollHeigth;
  }
  ngOnInit() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    this.pokeService.getPokelist(url);
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(): void {
    if (this.pokeList.next) this.pokeService.getPokelist(this.pokeList.next);
  }
}
