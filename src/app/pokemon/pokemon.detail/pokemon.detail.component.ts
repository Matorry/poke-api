import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs';
import { Ability } from 'src/models/ability';
import { Evolution } from 'src/models/evolution';
import { Pokemon } from 'src/models/pokemon';
import { RepoPokemonsService } from 'src/services/repo.pokemons.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'poke-api-pokemon.detail',
  templateUrl: './pokemon.detail.component.html',
  styleUrls: ['./pokemon.detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  @Input() isOpen: boolean;
  pokemon: Pokemon | undefined;
  id: string | null;
  modalData!: Ability;
  evolution: Evolution | null;
  firstEvolution: Pokemon | null;
  secondEvolution: Pokemon | null;

  constructor(
    private repo: RepoPokemonsService,
    private stateService: StateService,
    private route: ActivatedRoute
  ) {
    this.firstEvolution = null;
    this.secondEvolution = null;
    this.evolution = null;
    this.isOpen = false;
    this.id = this.route.snapshot.paramMap.get('id');
    this.stateService.getIsOpenModal().subscribe({
      next: (response) => (this.isOpen = response),
    });
  }

  ngOnInit() {
    this.stateService.setIsOpenModal(false);
    if (this.id) {
      this.stateService.getPokemons().subscribe({
        next: (response: Pokemon[]) => {
          this.pokemon = response.find(
            (element) => element.id === Number(this.id)
          );
        },
        error: (response) => {
          console.log(response);
        },
      });
      this.getEvolution();
    }
  }
  openModal(url: string) {
    this.getAbility(url);
    this.stateService.setIsOpenModal(true);
    console.log(this.evolution);
  }

  getEvolution() {
    if (this.id) {
      const evolutionObserbable = this.repo.getEvolution(this.id);
      concat(evolutionObserbable).subscribe({
        next: (resp) => {
          (this.evolution = resp), this.getPokemonEvolutions();
        },
      });
    }
  }

  getPokemonEvolutions() {
    if (this.evolution) {
      const firstEvolutionObserbable = this.repo.get(
        this.evolution.chain.evolves_to[0].species.url
      );
      concat(firstEvolutionObserbable).subscribe({
        next: (resp) => (this.firstEvolution = resp),
        error: (resp) => console.log(resp),
      });
      const secondEvolutionObserbable = this.repo.get(
        this.evolution.chain.evolves_to[0].evolves_to[0].species.url
      );
      concat(secondEvolutionObserbable).subscribe({
        next: (resp) => (this.secondEvolution = resp),
        error: (resp) => console.log(resp),
      });
    }
  }
  getAbility(url: string) {
    const abilityObserbable = this.repo.getAbility(url);
    concat(abilityObserbable).subscribe({
      next: (modalResponse) => {
        this.modalData = modalResponse;
        this.modalData.effect_entries = modalResponse.effect_entries.filter(
          (element) => element.language.name === 'en'
        );
      },
    });
  }
  closeModal(ev: boolean) {
    this.stateService.setIsOpenModal(ev);
  }
}
