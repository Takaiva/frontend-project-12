import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from '../thunks/fetchData.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload; // eslint-disable-line no-param-reassign
    },
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = 1; // eslint-disable-line no-param-reassign
      }
      channelsAdapter.removeOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      channelsAdapter.addMany(state, payload.channels);
      state.currentChannelId = payload.currentChannelId; // eslint-disable-line no-param-reassign
    });
  },
});

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
