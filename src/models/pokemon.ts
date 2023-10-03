type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Pokemon = {
  abilities: Ability[];
  id: number;
  species: {
    name: string;
  };
  sprites: {
    other: {
      nome: {
        front_default: string;
      };
    };
  };
};
