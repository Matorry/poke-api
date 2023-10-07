import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { Types, extendedType } from 'src/app/models/types';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { RepoPokemonsService } from 'src/app/services/repo.pokemons.service';
import { StateService } from 'src/app/services/state.service';
import { PokemonFormComponent } from './pokemon.form.component';

describe('Given the class PokemonFormComponent', () => {
  let component: PokemonFormComponent;
  let fixture: ComponentFixture<PokemonFormComponent>;
  let repoService: RepoPokemonsService;
  let pokeService: PokemonsService;
  let router: Router;
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PokemonFormComponent],
        providers: [RepoPokemonsService, StateService, PokemonsService],
        imports: [HttpClientTestingModule],
      });

      fixture = TestBed.createComponent(PokemonFormComponent);
      component = fixture.componentInstance;

      repoService = TestBed.inject(RepoPokemonsService);
      pokeService = TestBed.inject(PokemonsService);
      router = TestBed.inject(Router);
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should call ngOnInit', () => {
      spyOn(repoService, 'getTypes').and.returnValue(
        of({ results: [{}, {}, {}] } as Types)
      );
      component.ngOnInit();
      expect(repoService.getTypes).toHaveBeenCalled();
    });
    it('should call ngOnInit and getTypes return error', () => {
      spyOn(repoService, 'getTypes').and.returnValue(throwError('error'));
      component.ngOnInit();
      expect(repoService.getTypes).toHaveBeenCalled();
    });

    it('should call filterPokemonsByType with URL', () => {
      const typeUrl = 'typeUrl';
      const extendedTypeData: extendedType = {
        pokemon: [{ pokemon: { name: 'type1', url: typeUrl } }],
      };

      spyOn(repoService, 'getType').and.returnValue(of(extendedTypeData));
      spyOn(pokeService, 'getFilterPokemons');
      component.type = extendedTypeData;

      component.filterPokemonsByType(typeUrl);

      expect(repoService.getType).toHaveBeenCalledWith(typeUrl);
      expect(component.type?.pokemon[0].pokemon.url).toBe(typeUrl);
      expect(pokeService.getFilterPokemons).toHaveBeenCalledWith(
        component.type
      );
    });

    it('should call getPokelist with default URL', () => {
      spyOn(pokeService, 'getPokelist');

      component.filterPokemonsByType('');

      expect(pokeService.getPokelist).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      );
    });
    it('should call filterPokemonsById with id', () => {
      const id = '1';
      const pokemon = { name: 'type1', id: 1 } as unknown as Pokemon;
      spyOn(repoService, 'getById').and.returnValue(of(pokemon));
      spyOn(router, 'navigate');

      component.filterPokemonsById(id);

      expect(repoService.getById).toHaveBeenCalledWith(id);
      expect(router.navigate).toHaveBeenCalledWith(['pokemon/', id]);
    });
    it('should call filterPokemonsById with id and repo return error', () => {
      const id = '1';
      spyOn(repoService, 'getById').and.returnValue(throwError('error'));
      spyOn(router, 'navigate');

      component.filterPokemonsById(id);

      expect(repoService.getById).toHaveBeenCalledWith(id);
      expect(component.error).toEqual('Pokemon not found');
      expect(router.navigate).not.toHaveBeenCalled();
    });
    it('should call filterPokemonsById without id', () => {
      const id = '';
      spyOn(repoService, 'getById');
      spyOn(router, 'navigate');
      component.filterPokemonsById(id);

      expect(repoService.getById).not.toHaveBeenCalled();
      expect(component.error).toEqual('Insert id');
      expect(router.navigate).not.toHaveBeenCalled();
    });
    it('should call filterPokemonsByName with name', () => {
      const name = 'type1';
      const pokemon = { name: 'type1', id: 1 } as unknown as Pokemon;
      spyOn(repoService, 'get').and.returnValue(of(pokemon));
      spyOn(router, 'navigate');

      component.filterPokemonsByName(name);

      expect(repoService.get).toHaveBeenCalledWith(
        ' https://pokeapi.co/api/v2/pokemon/type1'
      );
      expect(router.navigate).toHaveBeenCalledWith(['pokemon/', '1']);
    });
    it('should call filterPokemonsByName with name and repo return error', () => {
      const name = 'type1';
      spyOn(repoService, 'get').and.returnValue(throwError('error'));
      spyOn(router, 'navigate');

      component.filterPokemonsByName(name);

      expect(repoService.get).toHaveBeenCalledWith(
        ' https://pokeapi.co/api/v2/pokemon/type1'
      );
      expect(component.error).toEqual('Pokemon not found');
      expect(router.navigate).not.toHaveBeenCalled();
    });
    it('should call filterPokemonsByName without name', () => {
      const name = '';
      spyOn(repoService, 'get');
      spyOn(router, 'navigate');
      component.filterPokemonsByName(name);

      expect(repoService.get).not.toHaveBeenCalled();
      expect(component.error).toEqual('Insert name');
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
