import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/models/pokemon';
import { Pokemons } from 'src/models/pokemons';

@Injectable({
  providedIn: 'root',
})
export class RepoPokemonsServiceService {
  constructor(private http: HttpClient) {}
  getAll(url: string): Observable<Pokemons> {
    return this.http.get(url, {}) as Observable<Pokemons>;
  }
  get(url: string): Observable<Pokemon> {
    return this.http.get(url, {}) as Observable<Pokemon>;
  }
}
