import { Store } from 'laco'

export const CounterStore = new Store({
  count: 0
}, 'Counter')

export const increment = () => CounterStore.set({ count: CounterStore.get().count + 1 }, 'Increment')
export const decrement = () => CounterStore.set({ count: CounterStore.get().count - 1 }, 'Decrement')
