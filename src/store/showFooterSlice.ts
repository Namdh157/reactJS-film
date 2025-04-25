import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShowFooterState {
    showFooter: boolean;
}

const initialState: ShowFooterState = {
    showFooter: false,
};

const showFooterSlice = createSlice({
    name: 'showFooter',
    initialState: initialState,
    reducers: {
        setShowFooter(state, action: PayloadAction<boolean>) {
            state.showFooter = action.payload;
        }
    }
});

export const { setShowFooter } = showFooterSlice.actions;
export default showFooterSlice.reducer;