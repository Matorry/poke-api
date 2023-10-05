import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ListComponent, CardComponent, PokemonDetailComponent, ModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [ListComponent],
})
export class PokemonModule {}
