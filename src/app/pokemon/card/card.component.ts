import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/models/pokemon';

@Component({
  selector: 'poke-api-pokemon-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() pokemons!: Pokemon[];
}
