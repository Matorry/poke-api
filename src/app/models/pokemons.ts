type Pokemon = {
  name: string;
  url: string;
};

export type Pokemons = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};
