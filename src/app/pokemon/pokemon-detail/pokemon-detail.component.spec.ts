import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Pokemon } from 'src/models/pokemon';
import { StateService } from 'src/services/state.service';
import { PokemonDetailComponent } from './pokemon-detail.component';

describe('Guiven the class PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let stateService: StateService;
  describe('When we instance it without errors', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PokemonDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: '1' }),
              },
            },
          },
          StateService,
        ],
      });
      fixture = TestBed.createComponent(PokemonDetailComponent);
      component = fixture.componentInstance;
      stateService = TestBed.inject(StateService);
      spyOn(stateService, 'getPokemons').and.returnValue(
        of([
          {
            id: 1,
            order: 1,
            species: {
              name: '',
            },
            abilities: [],
            sprites: {
              other: {
                home: {
                  front_default: '',
                },
                dream_world: {
                  front_default: '',
                },
              },
            },
            types: [{ type: { name: '' } }],
            weight: 1,
          },
          { id: 2 } as unknown as Pokemon,
        ])
      );
      fixture.detectChanges();
    });

    it('Then, the component should create', () => {
      expect(component).toBeTruthy();
      expect(component.pokemon?.id).toBe(1);
    });
  });
  describe('When we instance it with errors', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PokemonDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: '1' }),
              },
            },
          },
          StateService,
        ],
      });
      fixture = TestBed.createComponent(PokemonDetailComponent);
      component = fixture.componentInstance;
      stateService = TestBed.inject(StateService);
      spyOn(console, 'log');
      const errorObservable = throwError('Simulated error');
      spyOn(stateService, 'getPokemons').and.returnValue(errorObservable);
      fixture.detectChanges();
    });

    it('Then, the component should return error', () => {
      expect(console.log).toHaveBeenCalledWith('Simulated error');
    });
  });
});
