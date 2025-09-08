import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchActiveOffers = createAsyncThunk(
  'offers/fetchActiveOffers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/offers/active');
      return res.data.offers;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Failed to load offers');
    }
  }
);

export const fetchOffers = createAsyncThunk(
  'offers/fetchOffers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/offers', { headers: { Authorization: `Bearer ${token}` }});
      return res.data.offers;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Failed to load offers');
    }
  }
);

export const createOffer = createAsyncThunk(
  'offers/createOffer',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/offers', data, { headers: { Authorization: `Bearer ${token}` }});
      return res.data.offer;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Failed to create offer');
    }
  }
);

export const updateOffer = createAsyncThunk(
  'offers/updateOffer',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/offers/${id}`, data, { headers: { Authorization: `Bearer ${token}` }});
      return res.data.offer;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Failed to update offer');
    }
  }
);

export const deleteOffer = createAsyncThunk(
  'offers/deleteOffer',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/offers/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Failed to delete offer');
    }
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState: { active: [], all: [], loading: false, error: null },
  reducers: { clearError: (s) => { s.error = null; } },
  extraReducers: (b) => {
    b.addCase(fetchActiveOffers.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchActiveOffers.fulfilled, (s, a) => { s.loading = false; s.active = a.payload; })
     .addCase(fetchActiveOffers.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchOffers.fulfilled, (s, a) => { s.all = a.payload; })
     .addCase(createOffer.fulfilled, (s, a) => { s.all.unshift(a.payload); })
     .addCase(updateOffer.fulfilled, (s, a) => { const i = s.all.findIndex(o => o._id === a.payload._id); if (i !== -1) s.all[i] = a.payload; })
     .addCase(deleteOffer.fulfilled, (s, a) => { s.all = s.all.filter(o => o._id !== a.payload); });
  }
});

export const { clearError } = offersSlice.actions;
export default offersSlice.reducer;


