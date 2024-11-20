import { create } from 'zustand';
import { MAX_ENERGY } from '../utils/MAX_ENERGY';
import {
  getCloudStorageItem,
  setCloudStorageItem,
} from '@telegram-apps/sdk-react';

interface EnergyState {
  energy: number;
  maxEnergy: number;
  fetchEnergy: () => Promise<void>;
  increaseEnergy: () => Promise<void>;
  startAutoIncrease: () => void;
  stopAutoIncrease: () => void;
  substructEnergy: () => void;
}

let interval: NodeJS.Timeout | null = null;

const useEnergyStore = create<EnergyState>((set, get) => ({
  energy: 500, // Устанавливаем начальное значение 500, чтобы не было `null`
  maxEnergy: MAX_ENERGY,
  fetchEnergy: async () => {
    const existingEnergy = await getCloudStorageItem('energy');
    if (existingEnergy) {
      // Если данные есть, загружаем их
      set({ energy: Number(existingEnergy) });
    } else {
      // Если данных нет, сохраняем значение 500 в storage
      set({ energy: 500 });
      await setCloudStorageItem('energy', '500');
    }
  },
  increaseEnergy: async () => {
    set((state) => {
      const newEnergy = Math.min(state.energy + 1, state.maxEnergy);
      return { energy: newEnergy };
    });
    const newEnergy = get().energy;
    await setCloudStorageItem('energy', String(newEnergy));
  },
  substructEnergy: async () => {
    set((state) => {
      const newEnergy = Math.max(state.energy - 1, 0);
      return { energy: newEnergy };
    });
    const newEnergy = get().energy;
    await setCloudStorageItem('energy', String(newEnergy));
    if (newEnergy < get().maxEnergy && interval === null) {
      get().startAutoIncrease();
    }
  },
  startAutoIncrease: () => {
    if (interval === null) {
      interval = setInterval(async () => {
        const { energy, maxEnergy } = get();
        if (energy < maxEnergy) {
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
