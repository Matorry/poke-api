import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { ModalComponent } from './modal/modal.component';
import { PokemonDetailComponent } from './pokemon.detail/pokemon.detail.component';
import { PokemonFormComponent } from './pokemon.form/pokemon.form.component';

@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
    PokemonDetailComponent,
    ModalComponent,
    PokemonFormComponent,
  ],
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  exports: [ListComponent],
})
export class PokemonModule {}
