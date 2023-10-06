import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Pokemons } from 'src/app/models/pokemons';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { StateService } from 'src/app/services/state.service';
import { CardComponent } from '../card/card.component';
import { PokemonFormComponent } from '../pokemon.form/pokemon.form.component';
import { ListComponent } from './list.component';

describe('Given the class ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let stateService: StateService;
  let pokemonsService: PokemonsService;

  const mockPokelist: Pokemons = {
    count: 2,
    next: '1',
    previous: null,
    results: [
      { url: 'https://poke-api.co/api/v2/pokemon/1/', name: 'Bulbasaur' },
      { url: 'https://poke-api.co/api/v2/pokemon/2/', name: 'Ivisaur' },
    ],
  };

  describe('When i instance it', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [ListComponent, CardComponent, PokemonFormComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [StateService, PokemonsService],
      }).compileComponents();

      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      pokemonsService = TestBed.inject(PokemonsService);
      stateService = TestBed.inject(StateService);
      spyOn(stateService, 'getPokemonList').and.returnValue(of(mockPokelist));
      fixture.detectChanges();
    });

    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });

    it('Then, should call   getPokemons on initialization', () => {
      spyOn(pokemonsService, 'getPokelist').and.callThrough();
      component.ngOnInit();
      expect(pokemonsService.getPokelist).toHaveBeenCalled();
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
      spyOn(pokemonsService, 'getPokelist');
      component.pokeList = {
        next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
      } as Pokemons;
      component.onScrollDown();
      expect(pokemonsService.getPokelist).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20'
      );
    });
  });
});
