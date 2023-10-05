import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/models/pokemon';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'poke-api-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | undefined;
  id: string | null;

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
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
}
