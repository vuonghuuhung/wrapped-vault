import { create } from 'zustand';

type State = {
    isLoadingSignContract: boolean;
};

type Actions = {
    setIsLoadingSignContract: (body: boolean) => void;
    reset: () => void;
};

const initialState: State = {
    isLoadingSignContract: false,
};

const useStateSignContract = create<State & Actions>()((set) => ({
    ...initialState,
    setIsLoadingSignContract: (body) => set((state) => ({ isLoadingSignContract: (state.isLoadingSignContract = body) })),
    reset: () => {
        set(initialState);
    },
}));

export default useStateSignContract;
