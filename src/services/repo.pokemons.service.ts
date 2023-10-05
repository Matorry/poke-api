import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ability } from 'src/models/ability';
import { Evolution } from 'src/models/evolution';
import { Pokemon } from 'src/models/pokemon';
import { Pokemons } from 'src/models/pokemons';

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
  getEvolution(id: string): Observable<Evolution> {
    const url = 'https://pokeapi.co/api/v2/evolution-chain/' + id + '/';
    return this.http.get(url, {}) as Observable<Evolution>;
  }
}
