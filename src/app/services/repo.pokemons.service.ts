import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ability } from 'src/app/models/ability';

import { Pokemon } from 'src/app/models/pokemon';
import { Pokemons } from 'src/app/models/pokemons';
import { Types, extendedType } from 'src/app/models/types';

@Injectable({
  providedIn: 'root',
})
export class RepoPokemonsService {
  constructor(private http: HttpClient) {}
  getAll(url: string): Observable<Pokemons> {
    return this.http.get(url, {}) as Observable<Pokemons>;
  }
  get(url: string): Observable<Pokemon> {
    return this.http.get(url, {}) as Observable<Pokemon>;
  }
  getAbility(url: string): Observable<Ability> {
    return this.http.get(url, {}) as Observable<Ability>;
  }
  getById(id: string): Observable<Pokemon> {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    return this.http.get(url, {}) as Observable<Pokemon>;
  }
  getTypes(): Observable<Types> {
    return this.http.get(
      'https://pokeapi.co/api/v2/type/',
      {}
    ) as Observable<Types>;
  }
  getType(url: string): Observable<extendedType> {
    return this.http.get(url, {}) as Observable<extendedType>;
  }
}
