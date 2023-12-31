type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Move = {
  move: { name: string; url: string };
};

type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  abilities: Ability[];
  id: number;
  order: number;
  species: {
    name: string;
  };
  sprites: {
    front_default: string;
    other: {
      official_artwork: {
        front_default: string | null;
        front_shiny: string | null;
      };
      'official-artwork': {
        front_default: string | null;
        front_shiny: string | null;
      };
      home: {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  types: [{ type: { name: string } }];
  weight: number;
  moves: Move[];
  stats: Stats[];
};
