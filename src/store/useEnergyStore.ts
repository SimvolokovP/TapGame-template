import { create } from 'zustand';
import { MAX_ENERGY } from '../utils/MAX_ENERGY';
import {
  getCloudStorageItem,
  setCloudStorageItem,
} from '@telegram-apps/sdk-react';

interface EnergyState {
  energy: number;
  maxEnergy: number;
  isLoading: boolean; // Флаг для отслеживания загрузки
  fetchEnergy: () => Promise<void>;
  increaseEnergy: () => Promise<void>;
  startAutoIncrease: () => void;
  stopAutoIncrease: () => void;
  substructEnergy: () => void;
}

let interval: NodeJS.Timeout | null = null;

const useEnergyStore = create<EnergyState>((set, get) => ({
  energy: 500, // Начальное значение энергии
  maxEnergy: MAX_ENERGY,
  isLoading: true, // Состояние загрузки
  fetchEnergy: async () => {
    set({ isLoading: true }); // Устанавливаем флаг загрузки
    const existingEnergy = await getCloudStorageItem('energy');
    if (existingEnergy) {
      set({ energy: Number(existingEnergy), isLoading: false });
    } else {
      set({ energy: 500, isLoading: false });
      await setCloudStorageItem('energy', '500');
    }
  },
  increaseEnergy: async () => {
    if (get().isLoading) return; // Не даем увеличивать энергию, пока идет загрузка
    set((state) => {
      const newEnergy = Math.min(state.energy + 1, state.maxEnergy);
      return { energy: newEnergy };
    });
    const newEnergy = get().energy;
    await setCloudStorageItem('energy', String(newEnergy));
  },
  substructEnergy: async () => {
    if (get().isLoading) return; // Не даем уменьшать энергию, пока идет загрузка
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
