import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    type: null,
    item: null,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModalWindow: (state, { payload }) => {
            state.type = payload.type;
            state.item = payload.item;
        },
        closeModalWindow: (state) => {
            state.type = null;
            state.item = null;
        }
    },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
