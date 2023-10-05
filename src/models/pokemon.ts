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

export type Pokemon = {
  abilities: Ability[];
  id: number;
  order: number;
  species: {
    name: string;
  };
  sprites: {
    other: {
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
};
