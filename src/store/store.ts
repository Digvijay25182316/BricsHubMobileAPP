import {create} from 'zustand';

interface ModalControllState {
  ModalVisible: boolean;
}

interface LoadingControllState {
  isLoading: boolean;
}

interface ClientState {
  client: any;
  StoreClient: (value: any) => void;
}

export const useModalControlState = create<ModalControllState>(set => ({
  ModalVisible: false,
  makeVisible: (value: boolean) => set({ModalVisible: value}),
}));

export const useLoadingControllState = create<LoadingControllState>(set => ({
  isLoading: false,
  makeLoading: (value: boolean) => set({isLoading: value}),
}));
export const useClient = create<ClientState>(set => ({
  client: null,
  StoreClient: (value: any) => set({client: value}),
}));
