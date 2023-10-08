import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { RepoPokemonsService } from 'src/app/services/repo.pokemons.service';
import { StateService } from 'src/app/services/state.service';
import { PokemonDetailComponent } from './pokemon.detail.component';

describe('Given the class PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let stateService: StateService;
  let repo: RepoPokemonsService;
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
          RepoPokemonsService,
        ],
        imports: [HttpClientTestingModule, RouterTestingModule],
      });
      fixture = TestBed.createComponent(PokemonDetailComponent);
      component = fixture.componentInstance;
      stateService = TestBed.inject(StateService);
      repo = TestBed.inject(RepoPokemonsService);
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
              front_default: '',
              other: {
                official_artwork: {
                  front_default: '',
                  front_shiny: '',
                },
                'official-artwork': {
                  front_default: '',
                  front_shiny: '',
                },
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
            moves: [
              {
                move: {
                  name: '',
                  url: '',
                },
              },
            ],
            stats: [
              {
                base_stat: 0,
                effort: 0,
                stat: {
                  name: '',
                  url: '',
                },
              },
            ],
          },
          { id: 2 } as unknown as Pokemon,
        ])
      );
      spyOn(stateService, 'getIsOpenModal');
      spyOn(stateService, 'setIsOpenModal');
      spyOn(repo, 'getAbility').and.returnValue(
        of({
          effect_chance: 1,
          effect_entries: [
            {
              effect: 'a $effect_chance% a',
              language: {
                name: 'en',
                url: '',
              },
              short_effect: 'a $effect_chance% a',
            },
          ],
          id: 1,
          is_main_series: true,
          name: '',
        })
      );
      fixture.detectChanges();
    });

    it('Then, the component should create', () => {
      spyOn(repo, 'getById').and.returnValue(
        of({ id: 1 } as unknown as Pokemon)
      );
      component.id = '1';
      component.ngOnInit();
      expect(component).toBeTruthy();
      expect(repo.getById).toHaveBeenCalledWith(component.id);
      expect(component.pokemon?.id).toBe(1);
    });
    it('Then, if i use openModal method setIsOpenModal should be called', () => {
      component.openModal('');
      expect(stateService.setIsOpenModal).toHaveBeenCalledWith(true);
    });
    it('Then, if i use closeModal method setIsOpenModal should be called', () => {
      component.closeModal(false);
      expect(stateService.setIsOpenModal).toHaveBeenCalledWith(false);
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
          RepoPokemonsService,
        ],
        imports: [HttpClientTestingModule, RouterTestingModule],
      });
      fixture = TestBed.createComponent(PokemonDetailComponent);
      component = fixture.componentInstance;
      stateService = TestBed.inject(StateService);
      repo = TestBed.inject(RepoPokemonsService);
      spyOn(console, 'log');
      fixture.detectChanges();
    });

    it('Then, the component should return error', () => {
      spyOn(repo, 'getById').and.returnValue(throwError('Simulated error'));
      component.ngOnInit();
      expect(repo.getById).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Simulated error');
    });
  });
});
