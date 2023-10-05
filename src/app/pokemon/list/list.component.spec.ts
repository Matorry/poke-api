import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Pokemon } from 'src/models/pokemon';
import { Pokemons } from 'src/models/pokemons';
import { RepoPokemonsServiceService } from 'src/services/repo.pokemons.service.service';
import { StateService } from 'src/services/state.service';
import { CardComponent } from '../card/card.component';
import { ListComponent } from './list.component';

describe('Guiven the class ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let repoService: RepoPokemonsServiceService;
  let stateService: StateService;

  const mockPokelist: Pokemons = {
    count: 2,
    next: null,
    previous: null,
    results: [
      { url: 'https://poke-api.co/api/v2/pokemon/1/', name: 'Bulbasaur' },
      { url: 'https://poke-api.co/api/v2/pokemon/2/', name: 'Ivisaur' },
    ],
  };

  const mockPokemon1: Pokemon = {
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
  };

  describe('When i instance ListComponent without errors', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [ListComponent, CardComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [RepoPokemonsServiceService, StateService],
      }).compileComponents();

      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      repoService = TestBed.inject(RepoPokemonsServiceService);
      stateService = TestBed.inject(StateService);

      spyOn(repoService, 'getAll').and.returnValue(of(mockPokelist));
      spyOn(stateService, 'getPokemonList').and.returnValue(of(mockPokelist));
      spyOn(repoService, 'get').and.returnValue(of(mockPokemon1));

      fixture.detectChanges();
    });

    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });

    it('Then, should call getPokelist and getPokemons on initialization', () => {
      spyOn(component, 'getPokelist').and.callThrough();
      spyOn(component, 'getPokemons').and.callThrough();
      component.ngOnInit();
      expect(component.getPokelist).toHaveBeenCalled();
      expect(component.getPokemons).toHaveBeenCalled();
    });

    it('Then, should call getPokelist and update state correctly', () => {
      spyOn(component, 'getPokemons').and.callThrough();
      component.getPokelist('');
      expect(repoService.getAll).toHaveBeenCalled();
      expect(component.pokeList).toEqual(mockPokelist);
      expect(component.getPokemons).toHaveBeenCalled();
    });

    it('Then, should call getPokemons and update pokemons and state correctly', () => {
      component.getPokemons();
      expect(repoService.getAll).toHaveBeenCalled();
    });

    it('Then, should call onWindowScroll', () => {
      component.onWindowScroll();
      expect(component.showButton).toEqual(false);
    });

    it('Then, should call onScrollTop', () => {
      component.onScrollTop();
      expect(component.showButton).toEqual(false);
    });

    it('Then, should call onScrollDown', () => {
      component.pokeList.next = '1';
      component.onScrollDown();
      expect(component.showButton).toEqual(false);
    });
  });
  describe('When i instance ListComponent with errors', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ListComponent, CardComponent],
        imports: [HttpClientTestingModule],
        providers: [RepoPokemonsServiceService, StateService],
      }).compileComponents();

      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      repoService = TestBed.inject(RepoPokemonsServiceService);
      stateService = TestBed.inject(StateService);

      spyOn(repoService, 'getAll').and.returnValue(
        throwError('Simulated error')
      );

      fixture.detectChanges();
    });

    it('Then, should handle errors correctly', () => {
      const consoleLogSpy = spyOn(console, 'log');

      component.getPokelist('');

      expect(consoleLogSpy).toHaveBeenCalledWith('Simulated error');
    });
    it('Then, should handle errors in getPokemons correctly', () => {
      const consoleLogSpy = spyOn(console, 'log');

      const errorObservable = throwError('Simulated error');
      spyOn(repoService, 'get').and.returnValue(errorObservable);

      component.pokeList = {
        count: 2,
        next: null,
        previous: null,
        results: [
          { url: 'https://poke-api.co/api/v2/pokemon/1/', name: 'Bulbasaur' },
        ],
      };

      component.getPokemons();

      expect(consoleLogSpy).toHaveBeenCalledWith('Simulated error');
    });
  });
});
