import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_ENERGY } from "../utils/MAX_ENERGY";
import {
  getCloudStorageItem,
  setCloudStorageItem,
} from "@telegram-apps/sdk-react";

interface EnergyState {
  energy: number;
  maxEnergy: number;
  fetchEnergy: () => Promise<void>;
  increaseEnergy: () => Promise<void>;
  startAutoIncrease: () => void;
  substructEnergy: () => void;
}

let interval: NodeJS.Timeout | null = null;

const useEnergyStore = create<EnergyState>()(
  persist(
    (set, get) => ({
      energy: 0,
      maxEnergy: MAX_ENERGY,
      fetchEnergy: async () => {
        const existingEnergy = await getCloudStorageItem("energy");
        if (existingEnergy) {
          set({ energy: Number(existingEnergy) });
        }
      },
      increaseEnergy: async () => {
        set((state) => {
          const newEnergy = Math.min(state.energy + 1, state.maxEnergy);
          return { energy: newEnergy };
        });

        const newEnergy = get().energy + 1;
        await setCloudStorageItem("energy", String(newEnergy));
      },
      substructEnergy: async () => {
        set((state) => {
          const newEnergy = state.energy - 1;
          return { energy: newEnergy };
        });

        const newEnergy = get().energy - 1;
        await setCloudStorageItem("energy", String(newEnergy));
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
    }),
    {
      name: "energy-storage",
    }
  )
);

export default useEnergyStore;
