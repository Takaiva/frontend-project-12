import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  item: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalWindow: (state, { payload }) => {
      state.type = payload.type; // eslint-disable-line no-param-reassign
      state.item = payload.item; // eslint-disable-line no-param-reassign
    },
    closeModalWindow: (state) => {
      state.type = null; // eslint-disable-line no-param-reassign
      state.item = null; // eslint-disable-line no-param-reassign
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
