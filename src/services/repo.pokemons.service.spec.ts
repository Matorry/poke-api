import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Ability } from 'src/models/ability';
import { Evolution } from 'src/models/evolution';
import { Pokemon } from 'src/models/pokemon';
import { Pokemons } from 'src/models/pokemons';
import { RepoPokemonsService } from './repo.pokemons.service';

describe('Given the class RepoPokemonsServiceService', () => {
  let service: RepoPokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RepoPokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  describe('When i instance his methods', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Then should be call getAll', () => {
      const mockPokemons = {} as unknown as Pokemons;

      service.getAll('').subscribe((pokemons) => {
        expect(pokemons).toEqual(mockPokemons);
      });

      const req = httpMock.expectOne('');
      expect(req.request.method).toBe('GET');
    });

    it('Then should be call get', () => {
      const mockPokemon = {} as unknown as Pokemon;

      service.get('').subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
      });

      const req = httpMock.expectOne('');
      expect(req.request.method).toBe('GET');
    });
    it('Then should be call getAbility', () => {
      const mockAbility = {} as unknown as Ability;

      service.getAbility('').subscribe((pokemon) => {
        expect(pokemon).toEqual(mockAbility);
      });

      const req = httpMock.expectOne('');
      expect(req.request.method).toBe('GET');
    });
    it('Then should be call getEvolution', () => {
      const mockEvolution = {} as unknown as Evolution;

      service.getEvolution('1').subscribe((pokemon) => {
        expect(pokemon).toEqual(mockEvolution);
      });

      const req = httpMock.expectOne(
        'https://pokeapi.co/api/v2/evolution-chain/1/'
      );
      expect(req.request.method).toBe('GET');
    });
  });
});
