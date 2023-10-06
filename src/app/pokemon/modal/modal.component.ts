import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ability } from 'src/app/models/ability';

@Component({
  selector: 'poke-api-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() ability: Ability | null;
  @Output() isOpen: EventEmitter<boolean>;

  constructor() {
    this.isOpen = new EventEmitter();
    this.ability = null;
  }

  closeModal() {
    this.isOpen.emit(false);
  }
}
