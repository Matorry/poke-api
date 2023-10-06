import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
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
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PokemonFormComponent],
        providers: [RepoPokemonsService, StateService, PokemonsService],
        imports: [HttpClientTestingModule],
      });

      fixture = TestBed.createComponent(PokemonFormComponent);
      component = fixture.componentInstance;

      // Obtenemos instancias de los servicios
      repoService = TestBed.inject(RepoPokemonsService);
      pokeService = TestBed.inject(PokemonsService);
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

    // Puedes agregar más pruebas según sea necesario
  });
});
