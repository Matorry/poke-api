import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs';
import { Ability } from 'src/app/models/ability';
import { Pokemon } from 'src/app/models/pokemon';
import { RepoPokemonsService } from 'src/app/services/repo.pokemons.service';
import { StateService } from 'src/app/services/state.service';

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
  constructor(
    private repo: RepoPokemonsService,
    private stateService: StateService,
    private route: ActivatedRoute
  ) {
    this.isOpen = false;
    this.id = this.route.snapshot.paramMap.get('id');
    this.stateService.getIsOpenModal().subscribe({
      next: (response) => (this.isOpen = response),
    });
  }

  ngOnInit() {
    this.stateService.setIsOpenModal(false);
    if (this.id) {
      this.repo.getById(this.id).subscribe({
        next: (response) => (this.pokemon = response),
        error: (response) => console.log(response),
      });
    }
  }
  openModal(url: string) {
    this.getAbility(url);
    this.stateService.setIsOpenModal(true);
  }
  getAbility(url: string) {
    const abilityObserbable = this.repo.getAbility(url);
    concat(abilityObserbable).subscribe({
      next: (modalResponse) => {
        this.modalData = modalResponse;
        this.modalData.effect_entries = modalResponse.effect_entries.filter(
          (element) => element.language.name === 'en'
        );
        this.modalData = this.replaceEffect(this.modalData);
      },
    });
  }
  replaceEffect(ability: Ability) {
    if (ability.effect_entries[0].effect.includes('$effect_chance%')) {
      ability.effect_entries[0].effect =
        ability.effect_entries[0].effect.replace(
          '$effect_chance%',
          ability.effect_chance.toString() + '%'
        );
    }
    if (ability.effect_entries[0].short_effect.includes('$effect_chance%')) {
      ability.effect_entries[0].short_effect =
        ability.effect_entries[0].short_effect.replace(
          '$effect_chance%',
          ability.effect_chance.toString() + '%'
        );
    }
    return ability;
  }
  closeModal(ev: boolean) {
    this.stateService.setIsOpenModal(ev);
  }
}
