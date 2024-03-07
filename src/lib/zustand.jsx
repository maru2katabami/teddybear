import { create } from "zustand"

export const useZustand = create(( set, get ) => ({
  start: null, setStart: state => set({ start: state }),
  target: [ 0, 0, 0 ], setTarget: state => set({ target: state }),
  shoots: true, setShoots: () => set({ shoots: !get().shoots }),
  balls: [], setBalls: state => set({ balls: state }),
  impulse: 0, setImpulse: state => set({ impulse: state })
}))