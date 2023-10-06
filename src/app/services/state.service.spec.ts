import { TestBed } from '@angular/core/testing';
import { Pokemon } from 'src/app/models/pokemon';
import { Pokemons } from 'src/app/models/pokemons';
import { StateService } from './state.service';

describe('Given the class StateService', () => {
  let service: StateService;
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(StateService);
    });

    it('Then, should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Then, should initialize state with default values', () => {
      const initialStateList = service.pokemonList$;
      const initialState = service.pokemons$;

      expect(initialState).toBeDefined();
      expect(initialStateList).toBeDefined();

      expect(initialState.value).toEqual([] as Pokemon[]);
      expect(initialStateList.value).toEqual({} as Pokemons);
    });

    it('Then, should return the pokemons', () => {
      const pokemon = {} as unknown as Pokemon;
      service.setPokemons([pokemon]);
      let pokemons: Pokemon[] = [];
      service.getPokemons().subscribe((res) => (pokemons = res));
      expect(pokemons).toEqual([pokemon]);
    });

    it('Then, should return the pokemon list', () => {
      const pokemon = {} as unknown as Pokemons;
      service.setPokemonList(pokemon);
      let pokemons: Pokemons = {} as Pokemons;
      service.getPokemonList().subscribe((res) => (pokemons = res));
      expect(pokemons).toEqual(pokemon);
    });

    it('Then, should reset the pokemon list', () => {
      const pokemon = {} as unknown as Pokemons;
      service.setPokemonList();
      let pokemons: Pokemons = {} as Pokemons;
      service.getPokemonList().subscribe((res) => (pokemons = res));
      expect(pokemons).toEqual(pokemon);
    });
  });
});
