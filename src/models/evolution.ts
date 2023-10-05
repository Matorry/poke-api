export type Evolution = {
  chain: {
    evolves_to: [
      {
        evolves_to: [
          {
            species: {
              name: string;
              url: string;
            };
          }
        ];
        species: {
          name: string;
          url: string;
        };
      }
    ];
  };
};
