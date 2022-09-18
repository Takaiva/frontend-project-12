import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'chatPage/fetchData',
  async (header) => {
    const response = await axios.get(routes.dataPath(), { headers: header });
    return response.data;
  },
);

export default fetchData;
