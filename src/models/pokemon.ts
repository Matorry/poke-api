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
  order: number;
  species: {
    name: string;
  };
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  types: [{ type: { name: string } }];
};
