import {create} from 'zustand';

interface ColorSchemeState {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

interface LoadingControllState {
  isLoading: boolean;
}

interface ClientState {
  client: any;
  StoreClient: (value: any) => void;
}

export const useIsDarkController = create<ColorSchemeState>(set => ({
  isDark: false,
  setIsDark: (value: boolean) => set({isDark: value}),
}));

export const useLoadingControllState = create<LoadingControllState>(set => ({
  isLoading: false,
  makeLoading: (value: boolean) => set({isLoading: value}),
}));
export const useClient = create<ClientState>(set => ({
  client: null,
  StoreClient: (value: any) => set({client: value}),
}));
