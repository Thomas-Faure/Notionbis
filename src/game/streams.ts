/**
 * A simple functional reactive stream implementation.  Each stream
 * maintains a list of subscribers and a current value.  Pushing a
 * new value invokes all listeners in the order they were
 * registered.  Additional streams can be derived from a source
 * stream using the `map` function.
 */

export type Stream<T> = {
  subscribe: (listenerConfigs: { listener: (value: T) => void }) => () => void;
  push: (pushConfigs: { value: T }) => void;
  map: <U>(mapConfigs: { project: (value: T) => U }) => Stream<U>;
};

/**
 * Creates a new stream with an optional initial value.  The
 * resulting object exposes methods to subscribe to updates, push
 * values and create derived streams.  This implementation avoids
 * mutation except for the internal listeners list and current
 * value, which are encapsulated.
 */
export const createStream = <T,>(createStreamConfigs?: { initialValue?: T }): Stream<T> => {
  const listenersArray: Array<(v: T) => void> = [];
  let currentValue = createStreamConfigs?.initialValue as T;

  const subscribe = (listenerConfigs: { listener: (value: T) => void }): (() => void) => {
    const { listener } = listenerConfigs;
    listenersArray.push(listener);
    const unsubscribe = (): void => {
      const keepArray = listenersArray.filter((l) => l !== listener);
      listenersArray.splice(0, listenersArray.length, ...keepArray);
    };
    if (currentValue !== undefined) {
      listener(currentValue);
    }
    return unsubscribe;
  };

  const push = (pushConfigs: { value: T }): void => {
    currentValue = pushConfigs.value;
    listenersArray.map((l) => l(currentValue));
  };

  const map = <U,>(mapConfigs: { project: (value: T) => U }): Stream<U> => {
    const child = createStream<U>();
    subscribe({ listener: (v) => child.push({ value: mapConfigs.project(v) }) });
    return child;
  };

  return { subscribe, push, map };
};
