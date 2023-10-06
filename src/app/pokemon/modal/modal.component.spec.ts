import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('Given the class ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ModalComponent],
      });
      fixture = TestBed.createComponent(ModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then, the component should create', () => {
      expect(component).toBeTruthy();
    });
    it('Then, should emit false when closeModal is called', () => {
      const spy = spyOn(component.isOpen, 'emit');
      component.closeModal();
      expect(spy).toHaveBeenCalledWith(false);
    });
  });
});
