import { createStream, type Stream } from "./streams";
import type { Item } from "./items";

export type BagEntry = { item: Item; quantity: number };
export type InventoryState = { entriesArray: BagEntry[] };

export const createInventoryStore = (createInventoryStoreConfigs?: { initial?: InventoryState }) => {
  const initialState: InventoryState = createInventoryStoreConfigs?.initial ?? { entriesArray: [] };
  const bagStream: Stream<InventoryState> = createStream<InventoryState>({ initialValue: initialState });

  const getPrev = () => bagStream.getValue() ?? initialState;
  const setState = (state: InventoryState) => {
    bagStream.push({ value: state });
  };

  const addItem = (addItemConfigs: { item: Item; quantity?: number }) => {
    const { item, quantity } = addItemConfigs;
    const qty = quantity ?? 1;
    const prev = getPrev();
    const idx = prev.entriesArray.findIndex((e) => e.item.name === item.name);
    const entriesArray = [...prev.entriesArray];
    if (idx >= 0) {
      entriesArray[idx] = { item, quantity: entriesArray[idx].quantity + qty };
    } else {
      entriesArray.push({ item, quantity: qty });
    }
    setState({ entriesArray });
  };

  const useItem = (useItemConfigs: { itemName: string }) => {
    const { itemName } = useItemConfigs;
    const prev = getPrev();
    const idx = prev.entriesArray.findIndex((e) => e.item.name === itemName);
    if (idx < 0) return false;
    const entry = prev.entriesArray[idx];
    if (entry.quantity <= 0) return false;
    const newQuantity = entry.quantity - 1;
    const entriesArray = [...prev.entriesArray];
    entriesArray[idx] = { item: entry.item, quantity: newQuantity };
    setState({ entriesArray });
    return true;
  };

  return { bagStream, addItem, useItem };
};

export const inventoryStore = createInventoryStore();
