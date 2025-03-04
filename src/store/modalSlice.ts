import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean;
    slugMovie: string;
}

const initialState: ModalState = {
    isOpen: false,
    slugMovie: '',
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.isOpen = true;
            state.slugMovie = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.slugMovie = '';
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;