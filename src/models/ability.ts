export type Ability = {
  effect_entries: [
    {
      effect: string;
      language: {
        name: string;
        url: string;
      };
      short_effect: string;
    }
  ];
  id: number;
  is_main_series: boolean;
  name: string;
};
