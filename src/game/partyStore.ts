import { createStream, type Stream } from "./streams";

export type Creature = {
  id: string;
  name: string;
  level: number;
  exp: number;
  maxHp: number;
  hp: number;
  attack: number;
};

export type PartyState = {
  partyArray: Creature[];
  activeIndex: number;
};

export const createPartyStore = (createPartyStoreConfigs?: { initial?: PartyState }) => {
  const initialState: PartyState = createPartyStoreConfigs?.initial ?? {
    partyArray: [],
    activeIndex: 0,
  };
  const partyStream: Stream<PartyState> = createStream<PartyState>({ initialValue: initialState });

  const getPrev = () => partyStream.getValue() ?? initialState;

  const setState = (state: PartyState) => {
    partyStream.push({ value: state });
  };

  const addCreature = (addCreatureConfigs: { creature: Creature }) => {
    const prev = getPrev();
    if (prev.partyArray.length >= 6) return;
    setState({ ...prev, partyArray: [...prev.partyArray, addCreatureConfigs.creature] });
  };

  const switchActive = (switchActiveConfigs: { index: number }) => {
    const prev = getPrev();
    const index = switchActiveConfigs.index;
    const isValid = index >= 0 && index < prev.partyArray.length;
    if (!isValid) return;
    setState({ ...prev, activeIndex: index });
  };

  const gainExp = (gainExpConfigs: { amount: number }) => {
    const prev = getPrev();
    const current = prev.partyArray[prev.activeIndex];
    let { level, exp, maxHp, hp, attack } = current;
    let totalExp = exp + gainExpConfigs.amount;
    while (totalExp >= level * 10) {
      totalExp -= level * 10;
      level += 1;
      maxHp += 5;
      hp = maxHp;
      attack += 1;
    }
    const updatedCreature: Creature = { ...current, level, exp: totalExp, maxHp, hp, attack };
    const nextPartyArray = [...prev.partyArray];
    nextPartyArray[prev.activeIndex] = updatedCreature;
    setState({ ...prev, partyArray: nextPartyArray });
  };

  return { partyStream, addCreature, switchActive, gainExp };
};

export const partyStore = createPartyStore();
