import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/models/pokemon';
import { RepoPokemonsServiceService } from 'src/services/repo.pokemons.service.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'poke-api-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | undefined;
  id: string | null;
  isOpen: boolean;
  modalData: object;

  constructor(
    private repo: RepoPokemonsServiceService,
    private stateService: StateService,
    private route: ActivatedRoute
  ) {
    this.modalData = {};
    this.isOpen = false;
    this.id = this.route.snapshot.paramMap.get('id');
    this.stateService.getIsOpenModal().subscribe({
      next: (response) => (this.isOpen = response),
    });
  }

  ngOnInit(): void {
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
    }
  }
  openModal(url: string) {
    this.stateService.setIsOpenModal(true);
    this.repo.getAbility(url).subscribe({
      next: (resp) => ((this.modalData = resp), console.log(resp)),
      error: (resp) => console.log(resp),
    });
  }
  closeModal() {
    this.stateService.setIsOpenModal(false);
  }
}
