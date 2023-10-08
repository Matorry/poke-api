export type Effect = {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
};

export type Ability = {
  effect_entries: Effect[];
  id: number;
  is_main_series: boolean;
  name: string;
  effect_chance: number;
};
