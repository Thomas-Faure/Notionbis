export type Item = {
  name: string;
  effect: "heal" | "pokeball";
  value: number;
};

export const items = {
  potion: { name: "Potion", effect: "heal", value: 10 } as Item,
  pokeball: { name: "Pokeball", effect: "pokeball", value: 10 } as Item,
};
