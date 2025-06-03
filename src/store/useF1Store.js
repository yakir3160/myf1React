import { create } from "zustand";

export const useF1Store = create((set) => ({
    // Initial state for drivers and teams
    drivers: [],
    teams: [],
    isLoading : false,
    error: null,

    // Actions to set drivers and teams directly
    setDrivers: (drivers) => {set({ drivers });},
    setTeams: (teams) => {set({ teams });},
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));



