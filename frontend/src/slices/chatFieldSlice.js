import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
//import { actions as channelsActions } from './channelsSlice.js';
import fetchData from '../thunks/fetchData.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: messagesAdapter.addOne,
    },
    extraReducers: (builder) => {
      builder
          .addCase(fetchData.fulfilled, (state, { payload }) => {
              messagesAdapter.addMany(state, payload.messages);
          });
          /*.addCase(channelsActions.removeChannel, (state, { payload }) => {

          })*/
    },
});

export const { actions } = messagesSlice;

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
