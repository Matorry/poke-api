/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { Pokemons } from '../models/pokemons';
import { extendedType } from '../models/types';
import { PokemonsService } from './pokemons.service';
import { RepoPokemonsService } from './repo.pokemons.service';
import { StateService } from './state.service';

describe('Given the class PokemonsService', () => {
  let pokemonsService: PokemonsService;
  let repoPokemonsService: RepoPokemonsService;
  let stateService: StateService;
  describe('When i instance it without errors', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          PokemonsService,
          {
            provide: RepoPokemonsService,
            useValue: {
              getAll: (url: string) => of({} as Pokemons), // Mock getAll method
              get: (url: string) => of({} as Pokemon), // Mock get method
            },
          },
          {
            provide: StateService,
            useValue: {
              getPokemonList: () => of({} as Pokemons), // Mock getPokemonList method
              setPokemonList: (pokemonList: Pokemons) => {}, // Mock setPokemonList method
              getPokemons: () => of([] as Pokemon[]), // Mock getPokemons method
              setPokemons: (pokemons: Pokemon[]) => {}, // Mock setPokemons method
            },
          },
        ],
      });

      pokemonsService = TestBed.inject(PokemonsService);
      repoPokemonsService = TestBed.inject(RepoPokemonsService);
      stateService = TestBed.inject(StateService);
    });
    const mockPokemon = {
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
    } as Pokemon;

    it('should be created', () => {
      expect(pokemonsService).toBeTruthy();
    });

    it('should call getPokelist', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
      spyOn(repoPokemonsService, 'getAll').and.returnValue(
        of({ results: [] } as unknown as Pokemons)
      );
      spyOn(stateService, 'setPokemonList');
      spyOn(pokemonsService, 'getPokemons');

      pokemonsService.getPokelist(url);

      expect(repoPokemonsService.getAll).toHaveBeenCalledWith(url);
      expect(stateService.setPokemonList).toHaveBeenCalled();
      expect(pokemonsService.getPokemons).toHaveBeenCalled();
    });

    it('should call getPokemons', () => {
      spyOn(stateService, 'getPokemonList').and.returnValue(
        of({ results: [{ name: '1' }, { name: '2' }] } as unknown as Pokemons)
      );
      spyOn(repoPokemonsService, 'get').and.returnValue(of(mockPokemon));

      pokemonsService.getPokemons();

      expect(stateService.getPokemonList).toHaveBeenCalled();
    });

    it('should call getFilterPokemons', () => {
      const type = {
        pokemon: [{ pokemon: { url: 'url1' } }, { pokemon: { url: 'url2' } }],
      } as extendedType;
      spyOn(stateService, 'setPokemonList');

      spyOn(repoPokemonsService, 'get').and.returnValue(of(mockPokemon));

      pokemonsService.getFilterPokemons(type);

      expect(stateService.setPokemonList).toHaveBeenCalled();
      expect(repoPokemonsService.get).toHaveBeenCalled();
    });

    it('should call getFilterPokemons', () => {
      const type = {
        pokemon: [{ pokemon: { url: 'url1' } }, { pokemon: { url: 'url2' } }],
      } as extendedType;
      spyOn(stateService, 'setPokemonList');
      mockPokemon.sprites.front_default = '1';

      spyOn(repoPokemonsService, 'get').and.returnValue(of(mockPokemon));

      pokemonsService.getFilterPokemons(type);

      expect(stateService.setPokemonList).toHaveBeenCalled();
      expect(repoPokemonsService.get).toHaveBeenCalled();
    });
  });
  describe('When i instance it with errors', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [PokemonsService, RepoPokemonsService, StateService],
      });

      pokemonsService = TestBed.inject(PokemonsService);
      repoPokemonsService = TestBed.inject(RepoPokemonsService);
      stateService = TestBed.inject(StateService);
    });

    it('Then, should handle errors correctly', () => {
      spyOn(repoPokemonsService, 'getAll').and.returnValue(
        throwError('Simulated error')
      );
      const consoleLogSpy = spyOn(console, 'log');

      pokemonsService.getPokelist('1');

      expect(consoleLogSpy).toHaveBeenCalledWith('Simulated error');
    });
  });
});
