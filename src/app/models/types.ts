export type Type = {
  name: string;
  url: string;
};
export type Types = {
  results: Type[];
};
type Pokemon = { pokemon: { name: string; url: string } };
export type extendedType = {
  pokemon: Pokemon[];
};
