import { create } from 'zustand';
import { MAX_ENERGY } from '../utils/MAX_ENERGY';

interface EnergyState {
  energy: number;
  maxEnergy: number;
  isLoading: boolean;
  fetchEnergy: () => Promise<void>;
  increaseEnergy: () => Promise<void>;
  startAutoIncrease: () => void;
  stopAutoIncrease: () => void;
  substructEnergy: () => void;
}

let interval: NodeJS.Timeout | null = null;

const useEnergyStore = create<EnergyState>((set, get) => ({
  energy: 500,
  maxEnergy: MAX_ENERGY,
  isLoading: true,
  fetchEnergy: async () => {
    set({ isLoading: true });
    const existingEnergy = localStorage.getItem('energy');
    if (existingEnergy) {
      set({ energy: Number(existingEnergy), isLoading: false });
    } else {
      set({ energy: 500, isLoading: false });
      localStorage.setItem('energy', '500');
    }
  },
  increaseEnergy: async () => {
    if (get().isLoading) return;
    set((state) => {
      const newEnergy = Math.min(state.energy + 1, state.maxEnergy);
      return { energy: newEnergy };
    });
    const newEnergy = get().energy;
    if (newEnergy !== null) {
      localStorage.setItem('energy', String(newEnergy));
    }
  },
  substructEnergy: async () => {
    if (get().isLoading) return;
    set((state) => {
      const newEnergy = Math.max(state.energy - 1, 0);
      return { energy: newEnergy };
    });
    const newEnergy = get().energy;
    if (newEnergy !== null) {
      localStorage.setItem('energy', String(newEnergy));
    }
    if (newEnergy < get().maxEnergy && interval === null) {
      get().startAutoIncrease();
    }
  },
  startAutoIncrease: () => {
    if (interval === null) {
      interval = setInterval(async () => {
        const { energy, maxEnergy } = get();
        if (energy !== null && energy < maxEnergy) {
          await get().increaseEnergy();
        } else {
          clearInterval(interval!);
          interval = null;
        }
      }, 1000);
    }
  },
  stopAutoIncrease: () => {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  },
}));

export default useEnergyStore;
