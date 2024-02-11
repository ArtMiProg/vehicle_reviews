import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userCars: [],
  selectedCar: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCars: (state, action) => {
      state.userCars = action.payload;
    },
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
  },
});

