import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [ListComponent, CardComponent],
  imports: [CommonModule],
  exports: [ListComponent],
})
export class PokemonModule {}
