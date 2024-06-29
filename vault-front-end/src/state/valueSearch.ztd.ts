import { create } from 'zustand';

type State = {
    valueSearch: string;
};

type Actions = {
    setValueSearch: (body: string) => void;
    reset: () => void;
};

const initialState: State = {
    valueSearch: '',
};

const useGetValueSearch = create<State & Actions>()((set) => ({
    ...initialState,
    setValueSearch: (body) => set((state) => ({ valueSearch: (state.valueSearch = body) })),
    reset: () => {
        set(initialState);
    },
}));

export default useGetValueSearch;
