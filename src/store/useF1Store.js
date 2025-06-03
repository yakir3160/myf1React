import { create } from "zustand";
import {driversData, teamsData} from "../mockData";
export const useF1Store = create((set) => ({
    // Initial state for drivers and teams
    drivers: [teamsData],
    teams: driversData,
    // Actions to set drivers and teams directly
    setDrivers: () => set((drivers) => ({drivers })),
    setTeams: () => set((teams) => ({ teams })),
}));

